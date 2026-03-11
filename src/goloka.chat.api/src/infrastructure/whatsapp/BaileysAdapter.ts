import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  delay,
  WASocket,
} from '@whiskeysockets/baileys';
import pino from 'pino';
import path from 'path';
import { IWhatsAppService } from '../../application/services/IWhatsAppService';
import logger from '../logger';

/**
 * BaileysAdapter — Implements IWhatsAppService using @whiskeysockets/baileys.
 *
 * To swap to whatsapp-web.js: create a new class implementing IWhatsAppService
 * and inject it in container.ts — no use case code changes needed.
 */
export class BaileysAdapter implements IWhatsAppService {
  /** Active sockets keyed by sessionId */
  private sockets: Map<string, WASocket> = new Map();

  private getSessionPath(sessionId: string): string {
    const base = process.env.WA_SESSION_PATH || './sessions';
    return path.resolve(base, sessionId);
  }

  isConnected(sessionId: string): boolean {
    return this.sockets.has(sessionId);
  }

  async sendTextMessage(sessionId: string, to: string, text: string): Promise<void> {
    const sock = this.sockets.get(sessionId);
    if (!sock) throw new Error(`No active socket for session: ${sessionId}`);
    const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`;
    await sock.sendMessage(jid, { text });
  }

  async sendMediaMessage(
    sessionId: string,
    to: string,
    mediaUrl: string,
    caption?: string,
  ): Promise<void> {
    const sock = this.sockets.get(sessionId);
    if (!sock) throw new Error(`No active socket for session: ${sessionId}`);
    const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`;
    await sock.sendMessage(jid, {
      image: { url: mediaUrl },
      caption: caption ?? '',
    });
  }

  async connectSession(
    sessionId: string,
    phoneNumber: string,
    onQr: (qr: string) => void,
    onConnected: () => void,
  ): Promise<void> {
    const sessionPath = this.getSessionPath(sessionId);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
    });

    this.sockets.set(sessionId, sock);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        logger.info({ sessionId }, 'QR code generated');
        onQr(qr);
      }

      if (connection === 'open') {
        logger.info({ sessionId }, 'WhatsApp session connected');
        onConnected();
      }

      if (connection === 'close') {
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        this.sockets.delete(sessionId);
        logger.warn({ sessionId, statusCode }, 'WhatsApp session closed');

        if (shouldReconnect) {
          logger.info({ sessionId }, 'Reconnecting in 5s...');
          await delay(5000);
          this.connectSession(sessionId, phoneNumber, onQr, onConnected).catch((err) =>
            logger.error({ sessionId, err }, 'Reconnect failed'),
          );
        }
      }
    });

    // Listen for incoming messages (chatbot auto-reply)
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;
      for (const msg of messages) {
        if (msg.key.fromMe || !msg.message) continue;
        const sender = msg.key.remoteJid!;
        const text =
          msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        logger.debug({ sessionId, sender, text }, 'Incoming WhatsApp message');
        // Chatbot handling is done by a separate event / service layer
      }
    });
  }

  async disconnectSession(sessionId: string): Promise<void> {
    const sock = this.sockets.get(sessionId);
    if (sock) {
      await sock.logout();
      this.sockets.delete(sessionId);
    }
    logger.info({ sessionId }, 'WhatsApp session disconnected');
  }
}

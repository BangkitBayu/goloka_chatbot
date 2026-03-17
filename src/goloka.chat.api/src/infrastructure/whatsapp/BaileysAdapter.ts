import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  delay,
  WASocket,
  fetchLatestBaileysVersion,
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
    method: 'qr' | 'pairing',
    onCode: (code: string) => void,
    onConnected: () => void,
  ): Promise<void> {
    const sessionPath = this.getSessionPath(sessionId);
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: "silent" }),
      // WAJIB DI WINDOWS: Agar tidak dianggap bot/koneksi ilegal
      browser: ["Windows", "Chrome", "110.0.5481.178"],
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 0,
      keepAliveIntervalMs: 10000,
      generateHighQualityLinkPreview: true,
    });

    this.sockets.set(sessionId, sock);

    sock.ev.on('creds.update', saveCreds);

    let isSendPairingCode = false;

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (method === 'qr' && qr) {
        logger.info({ sessionId }, 'QR code generated');
        console.log("qrCode", qr);
        onCode(qr);
      }

      // Logic for pairing code
      if (
        method === 'pairing' &&
        qr &&
        !sock.authState.creds.registered &&
        !isSendPairingCode
      ) {
        isSendPairingCode = true;
        logger.info({ sessionId }, 'Socket ready, waiting for pairing code trigger...');

        setTimeout(async () => {
          try {
            const cleanNumber = phoneNumber.replace(/\D/g, '');
            logger.info({ sessionId, cleanNumber }, 'Requesting pairing code');
            const code = await sock.requestPairingCode(cleanNumber);
            console.log("pairingCode", code);
            onCode(code);
          } catch (error) {
            logger.error({ sessionId, error }, 'Failed to get pairing code');
            isSendPairingCode = false;
          }
        }, 10000); // Handshake delay
      }

      if (connection === 'open') {
        logger.info({ sessionId }, 'WhatsApp session connected');
        isSendPairingCode = false;
        onConnected();
      }

      if (connection === 'close') {
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        this.sockets.delete(sessionId);
        isSendPairingCode = false;
        logger.warn({ sessionId, statusCode }, 'WhatsApp session closed');

        if (shouldReconnect) {
          logger.info({ sessionId }, 'Reconnecting in 5s...');
          await delay(5000);
          this.connectSession(sessionId, phoneNumber, method, onCode, onConnected).catch((err) =>
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

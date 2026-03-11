/**
 * IWhatsAppService — Abstraction for WhatsApp messaging.
 * Implement this interface to swap adapters (Baileys, whatsapp-web.js, etc.)
 * without changing any application use case.
 */
export interface IWhatsAppService {
  /**
   * Send a text message to a WhatsApp number.
   * @param sessionId - ID of the active WhatsApp session
   * @param to - Recipient phone number (e.g. "628123456789")
   * @param text - Message text
   */
  sendTextMessage(sessionId: string, to: string, text: string): Promise<void>;

  /**
   * Send a media (image/video) message.
   * @param sessionId
   * @param to
   * @param mediaUrl - URL or local path of the media file
   * @param caption  - Optional caption
   */
  sendMediaMessage(sessionId: string, to: string, mediaUrl: string, caption?: string): Promise<void>;

  /**
   * Initialize and connect a WhatsApp session.
   * Triggers pairing code or QR code flow.
   * @param sessionId  - DB session ID
   * @param phoneNumber - Phone number to connect
   * @param method      - Connection method ('qr' or 'pairing')
   * @param onCode      - Callback when QR or Pairing code is available
   * @param onConnected - Callback when connected
   */
  connectSession(
    sessionId: string,
    phoneNumber: string,
    method: 'qr' | 'pairing',
    onCode: (code: string) => void,
    onConnected: () => void,
  ): Promise<void>;

  /**
   * Disconnect and destroy a WhatsApp session.
   */
  disconnectSession(sessionId: string): Promise<void>;

  /**
   * Check if a session is currently active/connected.
   */
  isConnected(sessionId: string): boolean;
}

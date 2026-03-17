import { AppError } from '../errors/AppError';

/**
 * PhoneNumber Value Object — normalizes Indonesian/international phone numbers.
 */
export class PhoneNumber {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  /**
   * Normalizes a phone number to international format without leading '+'
   * e.g. "08123456789" → "628123456789"
   */
  static create(phone: string): PhoneNumber {
    const cleaned = phone.replace(/[\s\-().+]/g, '');
    if (!/^\d{8,15}$/.test(cleaned)) {
      throw new AppError(`Invalid phone number: ${phone}`, 400);
    }
    // Normalize Indonesian local number
    const normalized = cleaned.startsWith('0')
      ? `62${cleaned.slice(1)}`
      : cleaned;
    return new PhoneNumber(normalized);
  }

  /** Returns WhatsApp JID format, e.g. "628123456789@s.whatsapp.net" */
  toWhatsAppJid(): string {
    return `${this._value}@s.whatsapp.net`;
  }

  get value(): string {
    return this._value;
  }

  equals(other: PhoneNumber): boolean {
    return this._value === other._value;
  }
}

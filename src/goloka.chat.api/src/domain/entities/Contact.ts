import { Entity } from '../base/Entity';

export interface ContactProps {
  userId: string;
  name: string;
  phoneNumber: string;
  groupTag?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Contact Domain Entity
 */
export class Contact extends Entity<string> {
  readonly userId: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly groupTag?: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(id: string, props: ContactProps) {
    super(id);
    this.userId = props.userId;
    this.name = props.name;
    this.phoneNumber = props.phoneNumber;
    this.groupTag = props.groupTag;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(id: string, props: ContactProps): Contact {
    return new Contact(id, props);
  }

  /** Format to WhatsApp JID */
  toWhatsAppJid(): string {
    const normalized = this.phoneNumber.startsWith('0')
      ? `62${this.phoneNumber.slice(1)}`
      : this.phoneNumber;
    return `${normalized}@s.whatsapp.net`;
  }
}

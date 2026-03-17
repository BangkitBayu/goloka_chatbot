import { Entity } from '../base/Entity';

export type SessionStatus = 'PENDING' | 'CONNECTED' | 'DISCONNECTED';

export interface WhatsAppSessionProps {
  userId: string;
  phoneNumber: string;
  sessionData?: Record<string, unknown> | null;
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * WhatsAppSession Domain Entity
 */
export class WhatsAppSession extends Entity<string> {
  private _status: SessionStatus;
  private _sessionData?: Record<string, unknown> | null;
  readonly userId: string;
  readonly phoneNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(id: string, props: WhatsAppSessionProps) {
    super(id);
    this.userId = props.userId;
    this.phoneNumber = props.phoneNumber;
    this._sessionData = props.sessionData;
    this._status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(id: string, props: WhatsAppSessionProps): WhatsAppSession {
    return new WhatsAppSession(id, props);
  }

  isConnected(): boolean {
    return this._status === 'CONNECTED';
  }

  markAsConnected(): void {
    this._status = 'CONNECTED';
  }

  markAsDisconnected(): void {
    this._status = 'DISCONNECTED';
  }

  get status(): SessionStatus {
    return this._status;
  }

  get sessionData(): Record<string, unknown> | null | undefined {
    return this._sessionData;
  }
}

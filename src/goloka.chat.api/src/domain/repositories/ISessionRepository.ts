import { WhatsAppSession, SessionStatus } from '../entities/WhatsAppSession';

export interface CreateSessionDTO {
  id: string;
  userId: string;
  phoneNumber: string;
}

/**
 * ISessionRepository — domain contract for WhatsApp session persistence.
 */
export interface ISessionRepository {
  findById(id: string): Promise<WhatsAppSession | null>;
  findByUserId(userId: string): Promise<WhatsAppSession[]>;
  findByPhoneNumber(phoneNumber: string): Promise<WhatsAppSession | null>;
  save(data: CreateSessionDTO): Promise<WhatsAppSession>;
  updateStatus(id: string, status: SessionStatus): Promise<void>;
  updateSessionData(id: string, sessionData: Record<string, unknown>): Promise<void>;
  delete(id: string): Promise<void>;
}

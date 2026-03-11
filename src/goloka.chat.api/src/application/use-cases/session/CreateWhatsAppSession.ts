import { v4 as uuidv4 } from 'uuid';
import { ISessionRepository } from '../../../domain/repositories/ISessionRepository';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IWhatsAppService } from '../../services/IWhatsAppService';
import { NotFoundError, AppError } from '../../../domain/errors/AppError';
import { WhatsAppSession } from '../../../domain/entities/WhatsAppSession';
import { CreateSessionRequest, CreateSessionResponse } from '../../dtos';

/**
 * CreateWhatsAppSession Use Case
 * Creates a session record and initiates Baileys connection.
 */
export class CreateWhatsAppSession {
  constructor(
    private readonly sessionRepository: ISessionRepository,
    private readonly userRepository: IUserRepository,
    private readonly whatsAppService: IWhatsAppService,
  ) {}

  async execute(
    userId: string,
    request: CreateSessionRequest,
    onCode: (code: string) => void,
  ): Promise<CreateSessionResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError('User');

    // Check if phone already has an active session
    const existing = await this.sessionRepository.findByPhoneNumber(request.phoneNumber);
    if (existing && this.whatsAppService.isConnected(existing.id)) {
      throw new AppError('A connected session already exists for this phone number.', 409);
    }

    // Persist session record (PENDING)
    const session = await this.sessionRepository.save({
      id: uuidv4(),
      userId,
      phoneNumber: request.phoneNumber,
    });

    const method = request.method || 'qr';

    // Initiate Baileys connection (non-blocking)
    this.whatsAppService.connectSession(
      session.id,
      request.phoneNumber,
      method,
      onCode,
      async () => {
        await this.sessionRepository.updateStatus(session.id, 'CONNECTED');
      },
    ).catch(async () => {
      await this.sessionRepository.updateStatus(session.id, 'DISCONNECTED');
    });

    return { sessionId: session.id, phoneNumber: session.phoneNumber, status: session.status };
  }
}

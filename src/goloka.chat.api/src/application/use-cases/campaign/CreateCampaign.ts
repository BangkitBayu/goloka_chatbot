import { v4 as uuidv4 } from 'uuid';
import { ICampaignRepository, CreateCampaignDTO } from '../../../domain/repositories/ICampaignRepository';
import { ISessionRepository } from '../../../domain/repositories/ISessionRepository';
import { NotFoundError, ForbiddenError } from '../../../domain/errors/AppError';
import { Campaign } from '../../../domain/entities/Campaign';
import { CreateCampaignRequest } from '../../dtos';

/**
 * CreateCampaign Use Case
 * Validates session ownership, then creates a campaign in DRAFT status.
 */
export class CreateCampaign {
  constructor(
    private readonly campaignRepository: ICampaignRepository,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(userId: string, request: CreateCampaignRequest): Promise<Campaign> {
    // Validate session belongs to this user
    const session = await this.sessionRepository.findById(request.sessionId);
    if (!session) throw new NotFoundError('WhatsApp Session');
    if (session.userId !== userId) throw new ForbiddenError();

    const data: CreateCampaignDTO = {
      id: uuidv4(),
      userId,
      sessionId: request.sessionId,
      name: request.name,
      messageContent: request.messageContent,
      mediaUrl: request.mediaUrl ?? null,
      scheduledAt: request.scheduledAt ? new Date(request.scheduledAt) : null,
    };

    return this.campaignRepository.save(data);
  }
}

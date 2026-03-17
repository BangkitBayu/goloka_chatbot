
import { ICampaignRepository } from '../../../domain/repositories/ICampaignRepository';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { ISessionRepository } from '../../../domain/repositories/ISessionRepository';
import { IContactRepository } from '../../../domain/repositories/IContactRepository';
import { IWhatsAppService } from '../../services/IWhatsAppService';
import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';
import {
  NotFoundError,
  ForbiddenError,
  QuotaExceededError,
  AppError,
} from '../../../domain/errors/AppError';
import { SendBlastRequest, SendBlastResult } from '../../dtos';

const DELAY_MS_MIN = 2000;
const DELAY_MS_MAX = 8000;

function randomDelay(): Promise<void> {
  const ms = Math.floor(Math.random() * (DELAY_MS_MAX - DELAY_MS_MIN)) + DELAY_MS_MIN;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * SendBlastMessage — Core use case for GOLOKA blast service.
 *
 * Flow:
 *  1. Verify campaign exists and belongs to the requesting user
 *  2. Verify the WhatsApp session is connected
 *  3. Resolve recipient list (manual or from contacts by groupTag)
 *  4. Validate user has sufficient quota
 *  5. Send messages via IWhatsAppService with random delays
 *  6. Update campaign counters and status
 *  7. Decrement user quota per successful send
 */
export class SendBlastMessage {
  constructor(
    private readonly campaignRepository: ICampaignRepository,
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly contactRepository: IContactRepository,
    private readonly whatsAppService: IWhatsAppService,
  ) {}

  async execute(userId: string, request: SendBlastRequest): Promise<SendBlastResult> {
    // 1. Load and validate campaign ownership
    const campaign = await this.campaignRepository.findById(request.campaignId);
    if (!campaign) throw new NotFoundError('Campaign');
    if (campaign.userId !== userId) throw new ForbiddenError();
    if (!campaign.canSend()) {
      throw new AppError(`Campaign cannot be sent in status: "${campaign.status}"`, 400);
    }

    // 2. Validate session is connected
    const session = await this.sessionRepository.findById(campaign.sessionId);
    if (!session) throw new NotFoundError('WhatsApp Session');
    if (!this.whatsAppService.isConnected(session.id)) {
      throw new AppError('WhatsApp session is not connected.', 400);
    }

    // 3. Resolve recipient list
    let recipients: string[] = [...(request.recipients ?? [])];
    if (request.groupTag) {
      const contacts = await this.contactRepository.findByUserId(userId, request.groupTag);
      const contactNumbers = contacts.map((c) => c.phoneNumber);
      recipients = [...new Set([...recipients, ...contactNumbers])];
    }

    if (recipients.length === 0) {
      throw new AppError('No valid recipients found.', 400);
    }

    // 4. Validate user quota
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError('User');
    if (!user.hasQuota(recipients.length)) {
      throw new QuotaExceededError(
        `Insufficient quota. Need ${recipients.length}, have ${user.quota}.`,
      );
    }

    // 5. Mark campaign as running
    await this.campaignRepository.updateStatus(campaign.id, { status: 'RUNNING' });

    let sent = 0;
    let failed = 0;

    // 6. Send messages with random delay
    for (const phone of recipients) {
      try {
        const phoneVO = PhoneNumber.create(phone);

        if (campaign.mediaUrl) {
          await this.whatsAppService.sendMediaMessage(
            session.id,
            phoneVO.value,
            campaign.mediaUrl,
            campaign.messageContent,
          );
        } else {
          await this.whatsAppService.sendTextMessage(
            session.id,
            phoneVO.value,
            campaign.messageContent,
          );
        }

        sent++;
        // Decrement quota per successful send
        await this.userRepository.updateQuota(userId, user.quota - sent);
      } catch {
        failed++;
      }

      // Anti-spam random delay
      await randomDelay();
    }

    // 7. Update final campaign status
    const finalStatus = failed === recipients.length ? 'FAILED' : 'DONE';
    await this.campaignRepository.updateStatus(campaign.id, { status: finalStatus, sentCount: sent, failedCount: failed });

    return { campaignId: campaign.id, total: recipients.length, sent, failed };
  }
}

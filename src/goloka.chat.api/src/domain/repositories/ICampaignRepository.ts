import { Campaign, CampaignStatus } from '../entities/Campaign';

export interface CreateCampaignDTO {
  id: string;
  userId: string;
  sessionId: string;
  name: string;
  messageContent: string;
  mediaUrl?: string | null;
  scheduledAt?: Date | null;
}

export interface UpdateCampaignStatusDTO {
  status: CampaignStatus;
  sentCount?: number;
  failedCount?: number;
}

/**
 * ICampaignRepository — domain contract for campaign persistence.
 */
export interface ICampaignRepository {
  findById(id: string): Promise<Campaign | null>;
  findByUserId(userId: string): Promise<Campaign[]>;
  save(data: CreateCampaignDTO): Promise<Campaign>;
  updateStatus(id: string, data: UpdateCampaignStatusDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

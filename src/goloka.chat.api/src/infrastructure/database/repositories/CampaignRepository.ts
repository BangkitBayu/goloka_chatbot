import { PrismaClient } from '@prisma/client';
import { ICampaignRepository, CreateCampaignDTO, UpdateCampaignStatusDTO } from '../../../domain/repositories/ICampaignRepository';
import { Campaign } from '../../../domain/entities/Campaign';
import { getPrismaClient } from '../prisma/prismaClient';

function mapToCampaign(r: any): Campaign {
  return Campaign.create(r.id, {
    userId: r.userId,
    sessionId: r.sessionId,
    name: r.name,
    messageContent: r.messageContent,
    mediaUrl: r.mediaUrl ?? null,
    scheduledAt: r.scheduledAt ?? null,
    status: r.status,
    sentCount: r.sentCount,
    failedCount: r.failedCount,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  });
}

/**
 * CampaignRepository — Prisma implementation of ICampaignRepository.
 */
export class CampaignRepository implements ICampaignRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  async findById(id: string): Promise<Campaign | null> {
    const r = await this.prisma.broadcastCampaign.findUnique({ where: { id } });
    return r ? mapToCampaign(r) : null;
  }

  async findByUserId(userId: string): Promise<Campaign[]> {
    const records = await this.prisma.broadcastCampaign.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map(mapToCampaign);
  }

  async save(data: CreateCampaignDTO): Promise<Campaign> {
    const r = await this.prisma.broadcastCampaign.create({
      data: {
        id: data.id,
        userId: data.userId,
        sessionId: data.sessionId,
        name: data.name,
        messageContent: data.messageContent,
        mediaUrl: data.mediaUrl ?? null,
        scheduledAt: data.scheduledAt ?? null,
        status: 'DRAFT',
        sentCount: 0,
        failedCount: 0,
      },
    });
    return mapToCampaign(r);
  }

  async updateStatus(id: string, data: UpdateCampaignStatusDTO): Promise<void> {
    await this.prisma.broadcastCampaign.update({
      where: { id },
      data: {
        status: data.status,
        ...(data.sentCount !== undefined && { sentCount: data.sentCount }),
        ...(data.failedCount !== undefined && { failedCount: data.failedCount }),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.broadcastCampaign.delete({ where: { id } });
  }
}

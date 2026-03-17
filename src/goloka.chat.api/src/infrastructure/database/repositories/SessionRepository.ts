import { PrismaClient } from '@prisma/client';
import { ISessionRepository, CreateSessionDTO } from '../../../domain/repositories/ISessionRepository';
import { WhatsAppSession, SessionStatus } from '../../../domain/entities/WhatsAppSession';
import { getPrismaClient } from '../prisma/prismaClient';

function mapToSession(r: any): WhatsAppSession {
  return WhatsAppSession.create(r.id, {
    userId: r.userId,
    phoneNumber: r.phoneNumber,
    sessionData: r.sessionData as Record<string, unknown> | null,
    status: r.status as SessionStatus,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  });
}

/**
 * SessionRepository — Prisma implementation of ISessionRepository.
 */
export class SessionRepository implements ISessionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  async findById(id: string): Promise<WhatsAppSession | null> {
    const r = await this.prisma.whatsAppSession.findUnique({ where: { id } });
    return r ? mapToSession(r) : null;
  }

  async findByUserId(userId: string): Promise<WhatsAppSession[]> {
    const records = await this.prisma.whatsAppSession.findMany({ where: { userId } });
    return records.map(mapToSession);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<WhatsAppSession | null> {
    const r = await this.prisma.whatsAppSession.findFirst({ where: { phoneNumber } });
    return r ? mapToSession(r) : null;
  }

  async save(data: CreateSessionDTO): Promise<WhatsAppSession> {
    const r = await this.prisma.whatsAppSession.create({
      data: { id: data.id, userId: data.userId, phoneNumber: data.phoneNumber, status: 'PENDING' },
    });
    return mapToSession(r);
  }

  async updateStatus(id: string, status: SessionStatus): Promise<void> {
    await this.prisma.whatsAppSession.update({ where: { id }, data: { status } });
  }

  async updateSessionData(id: string, sessionData: Record<string, unknown>): Promise<void> {
    await this.prisma.whatsAppSession.update({ where: { id }, data: { sessionData: sessionData as any } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.whatsAppSession.delete({ where: { id } });
  }
}

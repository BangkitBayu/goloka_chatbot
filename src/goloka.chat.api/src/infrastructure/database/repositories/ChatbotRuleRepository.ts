import { PrismaClient } from '@prisma/client';
import { IChatbotRuleRepository, CreateChatbotRuleDTO } from '../../../domain/repositories/IChatbotRuleRepository';
import { ChatbotRule } from '../../../domain/entities/ChatbotRule';
import { getPrismaClient } from '../prisma/prismaClient';

function mapToRule(r: any): ChatbotRule {
  return ChatbotRule.create(r.id, {
    userId: r.userId,
    sessionId: r.sessionId,
    triggerKeyword: r.triggerKeyword,
    responseMessage: r.responseMessage,
    isActive: r.isActive,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  });
}

/**
 * ChatbotRuleRepository — Prisma implementation.
 */
export class ChatbotRuleRepository implements IChatbotRuleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  async findById(id: string): Promise<ChatbotRule | null> {
    const r = await this.prisma.chatbotRule.findUnique({ where: { id } });
    return r ? mapToRule(r) : null;
  }

  async findBySessionId(sessionId: string): Promise<ChatbotRule[]> {
    const records = await this.prisma.chatbotRule.findMany({ where: { sessionId } });
    return records.map(mapToRule);
  }

  async findActiveBySessionId(sessionId: string): Promise<ChatbotRule[]> {
    const records = await this.prisma.chatbotRule.findMany({
      where: { sessionId, isActive: true },
    });
    return records.map(mapToRule);
  }

  async save(data: CreateChatbotRuleDTO): Promise<ChatbotRule> {
    const r = await this.prisma.chatbotRule.create({
      data: {
        id: data.id,
        userId: data.userId,
        sessionId: data.sessionId,
        triggerKeyword: data.triggerKeyword.toLowerCase().trim(),
        responseMessage: data.responseMessage,
        isActive: true,
      },
    });
    return mapToRule(r);
  }

  async update(id: string, data: Partial<CreateChatbotRuleDTO>): Promise<ChatbotRule> {
    const r = await this.prisma.chatbotRule.update({
      where: { id },
      data: {
        ...(data.triggerKeyword && { triggerKeyword: data.triggerKeyword.toLowerCase().trim() }),
        ...(data.responseMessage && { responseMessage: data.responseMessage }),
      },
    });
    return mapToRule(r);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.chatbotRule.delete({ where: { id } });
  }
}

import { v4 as uuidv4 } from 'uuid';
import { IChatbotRuleRepository } from '../../../domain/repositories/IChatbotRuleRepository';
import { ISessionRepository } from '../../../domain/repositories/ISessionRepository';
import { NotFoundError, ForbiddenError } from '../../../domain/errors/AppError';
import { ChatbotRule } from '../../../domain/entities/ChatbotRule';
import { CreateChatbotRuleRequest } from '../../dtos';

export class CreateChatbotRule {
  constructor(
    private readonly chatbotRuleRepository: IChatbotRuleRepository,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(userId: string, request: CreateChatbotRuleRequest): Promise<ChatbotRule> {
    const session = await this.sessionRepository.findById(request.sessionId);
    if (!session) throw new NotFoundError('WhatsApp Session');
    if (session.userId !== userId) throw new ForbiddenError();

    return this.chatbotRuleRepository.save({
      id: uuidv4(),
      userId,
      sessionId: request.sessionId,
      triggerKeyword: request.triggerKeyword,
      responseMessage: request.responseMessage,
    });
  }
}

export class GetChatbotRules {
  constructor(private readonly chatbotRuleRepository: IChatbotRuleRepository) {}

  async execute(sessionId: string): Promise<ChatbotRule[]> {
    return this.chatbotRuleRepository.findBySessionId(sessionId);
  }
}

export class DeleteChatbotRule {
  constructor(private readonly chatbotRuleRepository: IChatbotRuleRepository) {}

  async execute(userId: string, ruleId: string): Promise<void> {
    const rule = await this.chatbotRuleRepository.findById(ruleId);
    if (!rule) throw new NotFoundError('Chatbot Rule');
    if (rule.userId !== userId) throw new ForbiddenError();
    await this.chatbotRuleRepository.delete(ruleId);
  }
}

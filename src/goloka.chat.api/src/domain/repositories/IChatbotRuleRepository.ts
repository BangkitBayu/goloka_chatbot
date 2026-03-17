import { ChatbotRule } from '../entities/ChatbotRule';

export interface CreateChatbotRuleDTO {
  id: string;
  userId: string;
  sessionId: string;
  triggerKeyword: string;
  responseMessage: string;
}

/**
 * IChatbotRuleRepository — domain contract for chatbot rule persistence.
 */
export interface IChatbotRuleRepository {
  findById(id: string): Promise<ChatbotRule | null>;
  findBySessionId(sessionId: string): Promise<ChatbotRule[]>;
  findActiveBySessionId(sessionId: string): Promise<ChatbotRule[]>;
  save(data: CreateChatbotRuleDTO): Promise<ChatbotRule>;
  update(id: string, data: Partial<CreateChatbotRuleDTO>): Promise<ChatbotRule>;
  delete(id: string): Promise<void>;
}

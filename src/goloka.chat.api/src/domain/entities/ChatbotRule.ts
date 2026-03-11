import { Entity } from '../base/Entity';

export interface ChatbotRuleProps {
  userId: string;
  sessionId: string;
  triggerKeyword: string;
  responseMessage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ChatbotRule Domain Entity
 */
export class ChatbotRule extends Entity<string> {
  readonly userId: string;
  readonly sessionId: string;
  readonly triggerKeyword: string;
  readonly responseMessage: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(id: string, props: ChatbotRuleProps) {
    super(id);
    this.userId = props.userId;
    this.sessionId = props.sessionId;
    this.triggerKeyword = props.triggerKeyword.toLowerCase().trim();
    this.responseMessage = props.responseMessage;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(id: string, props: ChatbotRuleProps): ChatbotRule {
    return new ChatbotRule(id, props);
  }

  /** Check if incoming message triggers this rule */
  matches(incomingText: string): boolean {
    if (!this.isActive) return false;
    return incomingText.toLowerCase().includes(this.triggerKeyword);
  }
}

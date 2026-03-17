import { Request, Response, NextFunction } from 'express';
import {
  CreateChatbotRule,
  GetChatbotRules,
  DeleteChatbotRule,
} from '../../../application/use-cases/chatbot/ChatbotUseCases';

export class ChatbotController {
  constructor(
    private readonly createRule: CreateChatbotRule,
    private readonly getRules: GetChatbotRules,
    private readonly deleteRule: DeleteChatbotRule,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const rule = await this.createRule.execute(userId, req.body);
      res.status(201).json({ success: true, data: rule });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const rules = await this.getRules.execute(sessionId as string);
      res.status(200).json({ success: true, data: rules });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      await this.deleteRule.execute(userId, id as string);
      res.status(200).json({ success: true, message: 'Rule deleted.' });
    } catch (error) {
      next(error);
    }
  };
}

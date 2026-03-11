import { Router } from 'express';
import { ChatbotController } from '../controllers/ChatbotController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateChatbotRuleSchema } from '../../validators/schemas';

export function createChatbotRouter(controller: ChatbotController): Router {
  const router = Router();
  router.use(authenticate);

  // POST   /api/v1/chatbot/rules
  router.post('/rules', validate(CreateChatbotRuleSchema), controller.create);
  // GET    /api/v1/chatbot/rules/session/:sessionId
  router.get('/rules/session/:sessionId', controller.list);
  // DELETE /api/v1/chatbot/rules/:id
  router.delete('/rules/:id', controller.remove);

  return router;
}

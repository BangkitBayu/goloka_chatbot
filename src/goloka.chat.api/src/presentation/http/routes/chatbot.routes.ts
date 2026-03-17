import { Router } from 'express';
import { ChatbotController } from '../controllers/ChatbotController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateChatbotRuleSchema } from '../../validators/schemas';

export function createChatbotRouter(controller: ChatbotController): Router {
  const router = Router();
  router.use(authenticate);

  /**
   * @openapi
   * /api/v1/chatbot/rules:
   *   post:
   *     tags: [Chatbot]
   *     summary: Create a new chatbot rule
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [sessionId, keyword, response]
   *             properties:
   *               sessionId: { type: string }
   *               keyword: { type: string }
   *               response: { type: string }
   *               type: { type: string, enum: [exact, contains] }
   *     responses:
   *       201: { description: Created }
   */
  router.post('/rules', validate(CreateChatbotRuleSchema), controller.create);

  /**
   * @openapi
   * /api/v1/chatbot/rules/session/{sessionId}:
   *   get:
   *     tags: [Chatbot]
   *     summary: List chatbot rules for a session
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: sessionId
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.get('/rules/session/:sessionId', controller.list);

  /**
   * @openapi
   * /api/v1/chatbot/rules/{id}:
   *   delete:
   *     tags: [Chatbot]
   *     summary: Delete a chatbot rule
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.delete('/rules/:id', controller.remove);

  return router;
}

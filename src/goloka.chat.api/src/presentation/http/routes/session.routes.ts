import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateSessionSchema } from '../../validators/schemas';

export function createSessionRouter(controller: SessionController): Router {
  const router = Router();
  router.use(authenticate);

  /**
   * @openapi
   * /api/v1/sessions:
   *   post:
   *     tags: [Sessions]
   *     summary: Create/Initialize a WhatsApp session
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [sessionId]
   *             properties:
   *               sessionId: { type: string }
   *     responses:
   *       201: { description: Created }
   */
  router.post('/', validate(CreateSessionSchema), controller.create);

  /**
   * @openapi
   * /api/v1/sessions:
   *   get:
   *     tags: [Sessions]
   *     summary: List all active sessions
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200: { description: Success }
   */
  router.get('/', controller.list);

  /**
   * @openapi
   * /api/v1/sessions/{id}:
   *   delete:
   *     tags: [Sessions]
   *     summary: Disconnect and delete a session
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.delete('/:id', controller.disconnect);

  return router;
}

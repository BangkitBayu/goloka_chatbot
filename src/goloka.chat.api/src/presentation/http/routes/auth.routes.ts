import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { RegisterSchema, LoginSchema } from '../../validators/schemas';

export function createAuthRouter(controller: AuthController): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/auth/register:
   *   post:
   *     tags: [Auth]
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email: { type: string }
   *               password: { type: string }
   *     responses:
   *       201: { description: Created }
   */
  router.post('/register', validate(RegisterSchema), controller.register);

  /**
   * @openapi
   * /api/v1/auth/login:
   *   post:
   *     tags: [Auth]
   *     summary: Login to account
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email: { type: string }
   *               password: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.post('/login', validate(LoginSchema), controller.login);

  /**
   * @openapi
   * /api/v1/auth/me:
   *   get:
   *     tags: [Auth]
   *     summary: Get current user profile
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200: { description: Success }
   */
  router.get('/me', authenticate, controller.me);

  return router;
}

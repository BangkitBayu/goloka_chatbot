import { Router } from 'express';
import multer from 'multer';
import { CampaignController } from '../controllers/CampaignController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateCampaignSchema, SendBlastSchema } from '../../validators/schemas';

const upload = multer({ dest: 'uploads/' });

export function createCampaignRouter(controller: CampaignController): Router {
  const router = Router();

  // All campaign routes require authentication
  router.use(authenticate);

  /**
   * @openapi
   * /api/v1/campaigns:
   *   post:
   *     tags: [Campaigns]
   *     summary: Create a new campaign
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [name, sessionId]
   *             properties:
   *               name: { type: string }
   *               description: { type: string }
   *               sessionId: { type: string }
   *     responses:
   *       201: { description: Created }
   */
  router.post('/', validate(CreateCampaignSchema), controller.create);

  /**
   * @openapi
   * /api/v1/campaigns:
   *   get:
   *     tags: [Campaigns]
   *     summary: List all campaigns
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200: { description: Success }
   */
  router.get('/', controller.list);

  /**
   * @openapi
   * /api/v1/campaigns/{id}:
   *   get:
   *     tags: [Campaigns]
   *     summary: Get campaign by ID
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.get('/:id', controller.getById);

  /**
   * @openapi
   * /api/v1/campaigns/{id}/send:
   *   post:
   *     tags: [Campaigns]
   *     summary: Send blast messages for a campaign
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               csv:
   *                 type: string
   *                 format: binary
   *               message:
   *                 type: string
   *     responses:
   *       200: { description: Success }
   */
  router.post('/:id/send', upload.single('csv'), controller.send);

  return router;
}

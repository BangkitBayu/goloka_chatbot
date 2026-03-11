import { Router } from 'express';
import multer from 'multer';
import { ContactController } from '../controllers/ContactController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { UpsertContactSchema } from '../../validators/schemas';

const upload = multer({ dest: 'uploads/' });

export function createContactRouter(controller: ContactController): Router {
  const router = Router();
  router.use(authenticate);

  /**
   * @openapi
   * /api/v1/contacts:
   *   post:
   *     tags: [Contacts]
   *     summary: Create or update a contact
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [phoneNumber]
   *             properties:
   *               name: { type: string }
   *               phoneNumber: { type: string }
   *               groupTag: { type: string }
   *     responses:
   *       201: { description: Created }
   */
  router.post('/', validate(UpsertContactSchema), controller.upsert);

  /**
   * @openapi
   * /api/v1/contacts:
   *   get:
   *     tags: [Contacts]
   *     summary: List all contacts
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: query
   *         name: groupTag
   *         schema: { type: string }
   *         description: Filter by group tag
   *     responses:
   *       200: { description: Success }
   */
  router.get('/', controller.list);

  /**
   * @openapi
   * /api/v1/contacts/import:
   *   post:
   *     tags: [Contacts]
   *     summary: Import contacts from CSV
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               csv:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200: { description: Success }
   */
  router.post('/import', upload.single('csv'), controller.importCsv);

  /**
   * @openapi
   * /api/v1/contacts/{id}:
   *   delete:
   *     tags: [Contacts]
   *     summary: Delete a contact
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Success }
   */
  router.delete('/:id', controller.remove);

  return router;
}

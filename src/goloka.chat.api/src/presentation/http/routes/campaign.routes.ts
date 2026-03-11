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

  // POST   /api/v1/campaigns
  router.post('/', validate(CreateCampaignSchema), controller.create);

  // GET    /api/v1/campaigns
  router.get('/', controller.list);

  // GET    /api/v1/campaigns/:id
  router.get('/:id', controller.getById);

  // POST   /api/v1/campaigns/:id/send  (supports CSV file upload)
  router.post('/:id/send', upload.single('csv'), controller.send);

  return router;
}

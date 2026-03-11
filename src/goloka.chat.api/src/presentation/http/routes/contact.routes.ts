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

  // POST /api/v1/contacts
  router.post('/', validate(UpsertContactSchema), controller.upsert);
  // GET  /api/v1/contacts?groupTag=vip
  router.get('/', controller.list);
  // POST /api/v1/contacts/import  (CSV upload)
  router.post('/import', upload.single('csv'), controller.importCsv);
  // DELETE /api/v1/contacts/:id
  router.delete('/:id', controller.remove);

  return router;
}

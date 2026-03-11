import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateSessionSchema } from '../../validators/schemas';

export function createSessionRouter(controller: SessionController): Router {
  const router = Router();
  router.use(authenticate);

  // POST /api/v1/sessions
  router.post('/', validate(CreateSessionSchema), controller.create);
  // GET  /api/v1/sessions
  router.get('/', controller.list);
  // DELETE /api/v1/sessions/:id
  router.delete('/:id', controller.disconnect);

  return router;
}

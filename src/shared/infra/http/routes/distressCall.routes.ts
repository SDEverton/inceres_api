import { Router } from 'express';

import { CreateDistressCallController } from '@modules/distressCall/useCases/createDistressCall/CreateDistressCallController';

const distressCallRouter = Router();

const createDistressCallController = new CreateDistressCallController();

distressCallRouter.post('/', createDistressCallController.handle);

export { distressCallRouter };

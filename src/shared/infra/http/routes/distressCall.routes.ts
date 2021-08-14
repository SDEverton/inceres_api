import { Router } from 'express';

import { CreateDistressCallController } from '@modules/distressCall/useCases/createDistressCall/CreateDistressCallController';
import { CreateLocationHistoryController } from '@modules/distressCall/useCases/createLocationHistory/CreateLocationHistoryController';
import { FinishDistressCallController } from '@modules/distressCall/useCases/finishDistressCall/FinishDistressCallController';
import { ListAllDistressController } from '@modules/distressCall/useCases/listAllDistressCall/ListAllDistressCallController';
import { ListByIdDistressCallController } from '@modules/distressCall/useCases/listByIdDistressCall/ListByIdDistressCallController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const distressCallRouter = Router();

const createDistressCallController = new CreateDistressCallController();
const createLocationHistoryController = new CreateLocationHistoryController();
const finishDistressCallController = new FinishDistressCallController();
const listAllDistressController = new ListAllDistressController();
const listByIdDistressCallController = new ListByIdDistressCallController();

distressCallRouter.post(
  '/',
  ensureAuthenticated,
  createDistressCallController.handle
);
distressCallRouter.put(
  '/:distress_call_id',
  createLocationHistoryController.handle
);
distressCallRouter.patch(
  '/:id',
  ensureAuthenticated,
  finishDistressCallController.handle
);
distressCallRouter.post('/listall', listAllDistressController.handle);
distressCallRouter.get('/:_id', listByIdDistressCallController.handle);

export { distressCallRouter };

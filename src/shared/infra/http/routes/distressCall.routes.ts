import { Router } from 'express';

import { CreateDistressCallController } from '@modules/distressCall/useCases/createDistressCall/CreateDistressCallController';
import { CreateLocationHistoryController } from '@modules/distressCall/useCases/createLocationHistory/CreateLocationHistoryController';
import { FinishDistressCallController } from '@modules/distressCall/useCases/finishDistressCall/FinishDistressCallController';

const distressCallRouter = Router();

const createDistressCallController = new CreateDistressCallController();
const createLocationHistoryController = new CreateLocationHistoryController();
const finishDistressCallController = new FinishDistressCallController();

distressCallRouter.post('/', createDistressCallController.handle);
distressCallRouter.put(
  '/:distress_call_id',
  createLocationHistoryController.handle
);
distressCallRouter.patch('/:id', finishDistressCallController.handle);

export { distressCallRouter };

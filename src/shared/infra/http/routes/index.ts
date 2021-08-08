import { Router } from 'express';

import { distressCallRouter } from './distressCall.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/distresscall', distressCallRouter);

export { router };

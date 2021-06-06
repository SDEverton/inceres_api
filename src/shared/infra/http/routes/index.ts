import { Router } from 'express';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/v1/users', usersRouter);

export { router };

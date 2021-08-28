import { Router } from 'express';

import { notesRoutes } from './notes.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/notes', notesRoutes);

export { router };

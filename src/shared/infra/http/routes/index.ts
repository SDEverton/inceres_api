import { Router } from 'express';

import { prescriptionRoutes } from './prescriptons.routes';

const router = Router();

router.use('/v2/prescriptions', prescriptionRoutes);

export { router };

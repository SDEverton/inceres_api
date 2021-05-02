import { Router } from 'express';

import { CreatePrescriptionsController } from '@modules/prescriptions/useCases/createPrescriptions/CreatePrescriptionsController';

const prescriptionRoutes = Router();

const createPrescriptionsController = new CreatePrescriptionsController();

prescriptionRoutes.post('/', createPrescriptionsController.handle);

export { prescriptionRoutes };

import { Router } from 'express';

import { CreatePrescriptionsController } from '@modules/prescriptions/useCases/createPrescriptions/CreatePrescriptions.Controller';

const prescriptionRoutes = Router();

const createPrescriptionsController = new CreatePrescriptionsController();

prescriptionRoutes.post('/', createPrescriptionsController.handle);

export { prescriptionRoutes };

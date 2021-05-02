import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePrescriptionsUseCase } from './CreatePrescriptionsUseCase';

interface IRequest {
  clinic: {
    id: number;
  };
  physician: {
    id: number;
  };
  patient: {
    id: number;
  };
  text: string;
}

class CreatePrescriptionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clinic, physician, patient, text } = request.body as IRequest;

    const createPrescriptionsUseCase = container.resolve(
      CreatePrescriptionsUseCase
    );

    const prescription = await createPrescriptionsUseCase.execute({
      clinic_id: clinic.id,
      patient_id: patient.id,
      text,
      physician_id: physician.id,
    });

    return response.status(201).json(prescription);
  }
}

export { CreatePrescriptionsController };

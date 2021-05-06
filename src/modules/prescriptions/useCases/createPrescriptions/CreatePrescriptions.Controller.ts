import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IRequestHttp } from '@modules/prescriptions/interfaces/InterfacesCreatePrescriptions';
import { AppError } from '@shared/errors/AppError';
import { yup, validate } from '@shared/validations/RequestValidations';

import { CreatePrescriptionsUseCase } from './CreatePrescriptions.UseCase';

class CreatePrescriptionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clinic, physician, patient, text } = request.body as IRequestHttp;

    const schema = yup.object().shape({
      clinic: yup.object().shape({
        id: yup.number().required(),
      }),
      physician: yup.object().shape({
        id: yup.number().required(),
      }),
      patient: yup.object().shape({
        id: yup.number().required(),
      }),
      text: yup.string().min(5).required(),
    });

    const errors = await validate(schema, request.body);

    if (errors) {
      throw new AppError('malformed request', 404, '01');
    }

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

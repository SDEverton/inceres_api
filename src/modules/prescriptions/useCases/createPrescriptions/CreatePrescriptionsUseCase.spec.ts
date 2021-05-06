import 'dotenv/config';

import { PrescriptionRepositoryInMemory } from '@modules/prescriptions/repositories/in-memory/PrescriptionsRepositoryInMemory';
import { CacheProviderInMemory } from '@shared/container/providers/CacheProvider/in-memory/CacheProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreatePrescriptionsUseCase } from './CreatePrescriptions.UseCase';

jest.setTimeout(10000);

let createPresciptionUseCase: CreatePrescriptionsUseCase;
let prescriptionInMemory: PrescriptionRepositoryInMemory;
let cacheProvider: CacheProviderInMemory;

describe('Create Presciption', () => {
  beforeEach(() => {
    prescriptionInMemory = new PrescriptionRepositoryInMemory();
    cacheProvider = new CacheProviderInMemory();
    createPresciptionUseCase = new CreatePrescriptionsUseCase(
      prescriptionInMemory,
      cacheProvider
    );
  });

  it('should be able to create a new prescription', async () => {
    const prescription = await createPresciptionUseCase.execute({
      clinic_id: Math.floor(Math.random() * 6) + 1,
      patient_id: Math.floor(Math.random() * 6) + 1,
      text: 'Cibalena',
      physician_id: Math.floor(Math.random() * 6) + 1,
    });

    expect(prescription).toHaveProperty('data');
  });

  it('should not be able to create a new prescription if error in patients', async () => {
    await expect(
      createPresciptionUseCase.execute({
        clinic_id: Math.floor(Math.random() * 6) + 1,
        patient_id: 0.1,
        text: 'Cibalena',
        physician_id: Math.floor(Math.random() * 6) + 1,
      })
    ).rejects.toEqual(
      new AppError('patients service not available', 404, '03')
    );
  });

  it('should not be able to create a new prescription if error in physician', async () => {
    await expect(
      createPresciptionUseCase.execute({
        clinic_id: Math.floor(Math.random() * 6) + 1,
        patient_id: Math.floor(Math.random() * 6) + 1,
        text: 'Cibalena',
        physician_id: 0.1,
      })
    ).rejects.toEqual(new AppError('physician not found', 404, '02'));
  });

  it('should be able to create a new prescription not clinic', async () => {
    const prescription = await createPresciptionUseCase.execute({
      clinic_id: 0.1,
      patient_id: Math.floor(Math.random() * 6) + 1,
      text: 'Cibalena',
      physician_id: Math.floor(Math.random() * 6) + 1,
    });

    expect(prescription).toHaveProperty('data');
  });
});

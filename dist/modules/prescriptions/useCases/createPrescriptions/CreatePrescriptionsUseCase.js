"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePrescriptionsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IPrescriptionsRepository = require("../../repositories/IPrescriptionsRepository");

var _ICacheProvider = require("../../../../shared/container/providers/CacheProvider/models/ICacheProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _DependentServices = require("../../../../shared/infra/http/DependentServices");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreatePrescriptionsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrescriptionsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPrescriptionsRepository.IPrescriptionsRepository === "undefined" ? Object : _IPrescriptionsRepository.IPrescriptionsRepository, typeof _ICacheProvider.ICacheProvider === "undefined" ? Object : _ICacheProvider.ICacheProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePrescriptionsUseCase {
  constructor(prescriptionsRepository, cacheProvider) {
    this.prescriptionsRepository = prescriptionsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    clinic_id,
    patient_id,
    physician_id,
    text
  }) {
    const createConnection = new _DependentServices.DependentServices();
    let physician;
    const cachePhysician = await this.cacheProvider.recover(`@physician_${physician_id}`);

    if (cachePhysician) {
      physician = cachePhysician;
    } else {
      try {
        physician = await createConnection.execute({
          timeout: 4000,
          token: process.env.PHYSICIANS_TOKEN,
          method: 'GET',
          url: `physicians/${physician_id}`,
          retry: 2
        });
        await this.cacheProvider.save(`@physician_${physician_id}`, JSON.stringify({
          data: physician.data
        }), 48);
      } catch (error) {
        throw new _AppError.AppError('physician not found', 404, '02');
      }
    }

    let clinic;
    const cacheClinic = await this.cacheProvider.recover(`@clinic_${clinic_id}`);

    if (cacheClinic) {
      clinic = cacheClinic;
    } else {
      clinic = await createConnection.execute({
        timeout: 5000,
        token: process.env.CLINICS_TOKEN,
        method: 'GET',
        url: `clinics/${clinic_id}`,
        retry: 3
      });
      await this.cacheProvider.save(`@clinic_${clinic_id}`, JSON.stringify({
        data: clinic.data
      }), 72);
    }

    let patient;
    const cachePatient = await this.cacheProvider.recover(`@patient_${patient_id}`);

    if (cachePatient) {
      patient = cachePatient;
    } else {
      try {
        patient = await createConnection.execute({
          timeout: 3000,
          token: process.env.PATIENTS_TOKEN,
          method: 'GET',
          url: `patients/${patient_id}`,
          retry: 2
        });
        await this.cacheProvider.save(`@patient_${patient_id}`, JSON.stringify({
          data: patient.data
        }), 12);
      } catch (error) {
        throw new _AppError.AppError('patients service not available', 404, '03');
      }
    }

    const prescription = await this.prescriptionsRepository.create({
      clinic_id,
      patient_id,
      physician_id,
      text
    });

    try {
      await createConnection.execute({
        timeout: 6000,
        token: process.env.METRICS_TOKEN,
        method: 'POST',
        url: 'https://mysterious-island-73235.herokuapp.com/api/metrics',
        data: {
          clinic_id,
          clinic_name: clinic.data.name,
          physician_id,
          physician_name: physician.data.name,
          physician_crm: physician.data.crm,
          patient_id,
          patient_name: patient.data.name,
          patient_email: patient.data.email,
          patient_phone: patient.data.phone
        },
        retry: 5
      });
    } catch (error) {
      await this.prescriptionsRepository.destroy(prescription.id);
      throw new _AppError.AppError('metrics service not available', 404, '04');
    }

    return {
      data: {
        id: prescription.id,
        clinic: {
          id: clinic_id
        },
        physician: {
          id: physician_id
        },
        patient: {
          id: patient_id
        },
        text
      }
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreatePrescriptionsUseCase = CreatePrescriptionsUseCase;
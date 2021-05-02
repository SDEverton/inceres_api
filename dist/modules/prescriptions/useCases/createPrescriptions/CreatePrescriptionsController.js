"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePrescriptionsController = void 0;

var _tsyringe = require("tsyringe");

var _CreatePrescriptionsUseCase = require("./CreatePrescriptionsUseCase");

class CreatePrescriptionsController {
  async handle(request, response) {
    const {
      clinic,
      physician,
      patient,
      text
    } = request.body;

    const createPrescriptionsUseCase = _tsyringe.container.resolve(_CreatePrescriptionsUseCase.CreatePrescriptionsUseCase);

    const prescription = await createPrescriptionsUseCase.execute({
      clinic_id: clinic.id,
      patient_id: patient.id,
      text,
      physician_id: physician.id
    });
    return response.status(201).json(prescription);
  }

}

exports.CreatePrescriptionsController = CreatePrescriptionsController;
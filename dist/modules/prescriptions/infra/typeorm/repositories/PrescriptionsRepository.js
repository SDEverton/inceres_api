"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrescriptionsRepository = void 0;

var _typeorm = require("typeorm");

var _Prescriptions = require("../entities/Prescriptions");

class PrescriptionsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Prescriptions.Prescriptions);
  }

  async create({
    clinic_id,
    patient_id,
    physician_id,
    text
  }) {
    const prescription = this.repository.create({
      clinic_id,
      patient_id,
      physician_id,
      text
    });
    return this.repository.save(prescription);
  }

  async destroy(id) {
    await this.repository.delete(id);
  }

}

exports.PrescriptionsRepository = PrescriptionsRepository;
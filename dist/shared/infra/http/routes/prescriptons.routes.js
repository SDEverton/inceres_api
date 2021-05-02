"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prescriptionRoutes = void 0;

var _express = require("express");

var _CreatePrescriptionsController = require("../../../../modules/prescriptions/useCases/createPrescriptions/CreatePrescriptionsController");

const prescriptionRoutes = (0, _express.Router)();
exports.prescriptionRoutes = prescriptionRoutes;
const createPrescriptionsController = new _CreatePrescriptionsController.CreatePrescriptionsController();
prescriptionRoutes.post('/', createPrescriptionsController.handle);
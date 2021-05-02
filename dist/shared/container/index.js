"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _PrescriptionsRepository = require("../../modules/prescriptions/infra/typeorm/repositories/PrescriptionsRepository");

_tsyringe.container.registerSingleton('PrescriptionsRepository', _PrescriptionsRepository.PrescriptionsRepository);
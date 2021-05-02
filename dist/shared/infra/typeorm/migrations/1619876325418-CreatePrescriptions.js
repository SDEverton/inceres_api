"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersToken1618169933823 = void 0;

var _typeorm = require("typeorm");

class CreateUsersToken1618169933823 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'prescriptions',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true
      }, {
        name: 'clinic_id',
        type: 'integer'
      }, {
        name: 'physician_id',
        type: 'integer'
      }, {
        name: 'patient_id',
        type: 'integer'
      }, {
        name: 'text',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('prescriptions');
  }

}

exports.CreateUsersToken1618169933823 = CreateUsersToken1618169933823;
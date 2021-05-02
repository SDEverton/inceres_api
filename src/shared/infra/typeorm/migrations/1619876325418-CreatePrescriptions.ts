import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersToken1618169933823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'prescriptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'clinic_id',
            type: 'integer',
          },
          {
            name: 'physician_id',
            type: 'integer',
          },
          {
            name: 'patient_id',
            type: 'integer',
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('prescriptions');
  }
}

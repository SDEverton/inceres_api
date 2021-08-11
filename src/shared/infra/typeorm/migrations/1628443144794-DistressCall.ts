import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DistressCall1628443144794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'distress_call',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'lat',
            type: 'decimal',
          },
          {
            name: 'lng',
            type: 'decimal',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'token_channel',
            type: 'varchar',
          },
          {
            name: 'activid',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('distress_call');
  }
}

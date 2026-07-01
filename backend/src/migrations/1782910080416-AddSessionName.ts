import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionName1782910080416 implements MigrationInterface {
  name = 'AddSessionName1782910080416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "name"`);
  }
}

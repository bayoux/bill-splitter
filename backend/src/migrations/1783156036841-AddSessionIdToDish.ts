import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionIdToDish1783156036841 implements MigrationInterface {
  name = 'AddSessionIdToDish1783156036841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dishes" ADD "sessionId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "dishes" ADD CONSTRAINT "FK_2aa3d8cd75925d3f002db8261fa" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dishes" DROP CONSTRAINT "FK_2aa3d8cd75925d3f002db8261fa"`,
    );
    await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "sessionId"`);
  }
}

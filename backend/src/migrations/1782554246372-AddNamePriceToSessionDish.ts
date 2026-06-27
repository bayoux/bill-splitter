import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNamePriceToSessionDish1782554246372 implements MigrationInterface {
  name = 'AddNamePriceToSessionDish1782554246372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session_dishes" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_dishes" ADD "price" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "session_dishes" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "session_dishes" DROP COLUMN "name"`);
  }
}

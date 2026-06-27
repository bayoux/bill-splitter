import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDishFkFromSessionDish1782562639557 implements MigrationInterface {
  name = 'RemoveDishFkFromSessionDish1782562639557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session_dishes" DROP CONSTRAINT "FK_181990bb8f2d15a027e154a4251"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session_dishes" ADD CONSTRAINT "FK_181990bb8f2d15a027e154a4251" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}

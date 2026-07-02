import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOwnerToSessions1782985970310 implements MigrationInterface {
  name = 'AddOwnerToSessions1782985970310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "ownerId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_4ff4338a217fbcf774e41f35889" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_4ff4338a217fbcf774e41f35889"`,
    );
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ownerId"`);
  }
}

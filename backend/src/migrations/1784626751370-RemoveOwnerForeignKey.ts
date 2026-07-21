import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOwnerForeignKey1784626751370 implements MigrationInterface {
  name = 'RemoveOwnerForeignKey1784626751370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_4ff4338a217fbcf774e41f35889"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "ownerId" TYPE character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "ownerId" TYPE uuid USING "ownerId"::uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_4ff4338a217fbcf774e41f35889" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}

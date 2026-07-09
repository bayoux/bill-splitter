import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQrUrlToSession1783524649514 implements MigrationInterface {
    name = 'AddQrUrlToSession1783524649514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ADD "qrUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "qrUrl"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDishFkFromSelections1782580154795 implements MigrationInterface {
    name = 'RemoveDishFkFromSelections1782580154795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selections" DROP CONSTRAINT "FK_90fb12c0737b47381f590f74cea"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "selections" ADD CONSTRAINT "FK_90fb12c0737b47381f590f74cea" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1782203167934 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    return Promise.resolve();
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    return Promise.resolve();
  }
}

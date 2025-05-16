import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitMigration1747365345669 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

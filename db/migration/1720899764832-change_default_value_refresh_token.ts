import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDefaultValueRefreshToken1720899764832 implements MigrationInterface {
    name = 'ChangeDefaultValueRefreshToken1720899764832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}

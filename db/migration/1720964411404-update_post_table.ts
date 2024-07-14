import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1720964411404 implements MigrationInterface {
    name = 'UpdatePostTable1720964411404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`desription\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`description\` \`desription\` varchar(255) NOT NULL`);
    }

}

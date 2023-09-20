import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSummaryFieldToPostTable1695200565399 implements MigrationInterface {
    name = 'AddSummaryFieldToPostTable1695200565399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}

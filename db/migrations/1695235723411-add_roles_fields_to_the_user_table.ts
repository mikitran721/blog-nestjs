import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesFieldsToTheUserTable1695235723411 implements MigrationInterface {
    name = 'AddRolesFieldsToTheUserTable1695235723411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}

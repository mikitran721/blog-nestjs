import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValForRefreshToken1694689225353 implements MigrationInterface {
    name = 'SetDefaultValForRefreshToken1694689225353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}

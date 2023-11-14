import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTask1699866467979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "task" (
                id SERIAL PRIMARY KEY,
                title VARCHAR,
                status VARCHAR,
                priority INT,
                "isDone" BOOLEAN
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE task;`);
    }

}

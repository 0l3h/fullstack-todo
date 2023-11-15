import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task.entity";
import path from "path";

const config =
  process.env.NODE_ENV === "production"
    ? {
        url: process.env.DATABASE_URL,
      }
    : {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT as unknown as number,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      };

export const AppDataSource = new DataSource({
  type: "postgres",
  ...config,
  logging: true,
  entities: [Task],
  migrations: [`${path.resolve(__dirname, "migrations")}`],
});

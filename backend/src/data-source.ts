import "reflect-metadata";
import { DataSource, DataSourceOptions, DatabaseType } from "typeorm";
import { Task } from "./entity/task.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [Task],
  migrations: ["src/migrations/*.ts"],
});

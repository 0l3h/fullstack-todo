import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task.entity";
import { CreateTask1699866467979 } from "./migrations/1699866467979-create-task";
import config from "./config/db.config";

console.log(`${__dirname}/migrations/`);

export const AppDataSource = new DataSource({
  type: "postgres",
  ...config,
  logging: true,
  entities: [Task],
  synchronize: false,
  migrationsRun: true,
  migrations: [CreateTask1699866467979],
});

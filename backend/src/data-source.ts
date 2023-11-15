import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task.entity.js";
import config from "./config/db.config.js";

console.log(`${__dirname}/migrations/`);

export const AppDataSource = new DataSource({
  type: "postgres",
  ...config,
  logging: true,
  entities: [Task],
  synchronize: false,
  migrationsRun: true,
  migrations: [`${__dirname}/migrations/*.js`],
});

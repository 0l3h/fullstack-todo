import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task.entity";
import path from "path";

console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

console.log("Attempting to connect...");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as unknown as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: [Task],
  migrations: [`${path.resolve(__dirname, "migrations")}`],
});

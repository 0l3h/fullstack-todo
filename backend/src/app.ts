import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./controllers/task.controller";
import { AppDataSource } from "./data-source";
const PORT = process.env.PORT;
const app = express();

AppDataSource.initialize()
  .then((dataSource) => {
    console.log("Database has initialized\n");
  })
  .catch((error) => console.error(error));

app.use(
  cors({
    origin: process.env.CLIENT_URL && "*",
  }),
);
app.use(express.json());

app.get("/get-tasks/:filterBy?", getTasks);
app.post("/add-task", createTask);
app.patch("/update-task/:id", updateTask);
app.delete("/delete-task/:id", deleteTask);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Requested resource was not found");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.send(error);
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});

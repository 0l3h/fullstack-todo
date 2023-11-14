import { Request, Response } from "express";
import * as taskService from "../services/task.service";

async function getTasks(req: Request, res: Response) {
  const { searchBy, filterBy } = req.query;
  const tasks = await taskService.getTasks({
    filterBy: String(filterBy),
    ...(searchBy ? { searchBy: String(searchBy) } : {}),
  });
  res.json(tasks);
}

async function createTask(req: Request, res: Response) {
  const { title, priority } = req.body;
  const message = taskService.createTask({ title, priority });
  res.json(message);
}

async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const message = taskService.deleteTask(+id);
  res.json(message);
}

async function updateTask(req: Request, res: Response) {
  const { isDone } = req.body;
  const { id } = req.params;
  console.log(typeof id);

  const updatedTask = await taskService.updateTask({ id: Number(id), isDone });
  res.json(updatedTask);
}

export { getTasks, createTask, deleteTask, updateTask };

import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/task.service";

async function getTasks(req: Request, res: Response, next: NextFunction) {
  const { searchBy, filterBy } = req.query;
  try {
    const tasks = await taskService.getTasks({
      filterBy: String(filterBy),
      ...(searchBy ? { searchBy: String(searchBy) } : {}),
    });
    // throw new Error("Something went wrong");
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTask(req: Request, res: Response, next: NextFunction) {
  const { title, priority } = req.body;
  try {
    const message = taskService.createTask({ title, priority });
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const message = taskService.deleteTask(+id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
  const { isDone } = req.body;
  const { id } = req.params;
  try {
    const updatedTask = await taskService.updateTask({
      id: Number(id),
      isDone,
    });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

export { getTasks, createTask, deleteTask, updateTask };

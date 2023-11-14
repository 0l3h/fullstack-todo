import { FindOptionsWhere, ILike } from "typeorm";
import { Message } from "../types/common.types";
import { ITask, TaskBody } from "../types/task.types";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/task.entity";

const tasksRepository = AppDataSource.getRepository(Task);

async function getTasks({
  searchBy,
  filterBy,
}: {
  searchBy?: string;
  filterBy: string;
}): Promise<ITask[]> {
  console.log("search by: ", searchBy);
  const tasks = await tasksRepository.find({
    where: {
      title: searchBy ? ILike(`%${searchBy}%`) : undefined,
      status: filterBy === "all" ? undefined : filterBy,
    } as FindOptionsWhere<Task>,
    order: { priority: "ASC" },
  });

  console.log(tasks);
  return tasks;
}

async function createTask(taskBody: TaskBody): Promise<Message> {
  await tasksRepository.insert({
    ...taskBody,
    status: "undone",
    isDone: false,
  });
  return { message: "Task created successfully" };
}

async function updateTask({
  id,
  isDone,
}: {
  id: number;
  isDone: boolean;
}): Promise<Task> {
  console.log(id);
  const task = await tasksRepository.save({
    id,
    isDone,
    status: isDone ? "done" : "undone",
  });
  console.log("updated task: ", task);
  return task;
}

async function deleteTask(id: number): Promise<Message> {
  tasksRepository.delete(id);
  return { message: "Task deleted successfully" };
}

export { getTasks, createTask, deleteTask, updateTask };

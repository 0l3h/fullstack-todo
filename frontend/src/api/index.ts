import { Message } from "@/types/common.types";
import { Task, TaskBody } from "@/types/task.types";

const url =
  process.env.NODE_ENV === "production"
    ? `http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_DB_PORT}`
    : process.env.SERVER_URL;

export async function getTasks({
  filter,
  search,
}: {
  filter: string;
  search: string;
}): Promise<Task[]> {
  const params = new URLSearchParams();
  search && params.append("searchBy", search);
  filter && params.append("filterBy", filter);

  return (
    await fetch(`${url}/get-tasks?${params.toString()}`, {
      next: { revalidate: 0 },
    })
  ).json();
}

export async function createTask(task: TaskBody): Promise<Message> {
  return (
    await fetch(
      `http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_DB_PORT}/add-task`,
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      },
    )
  ).json();
}

export async function updateTask({
  id,
  isDone,
}: {
  id: number | string;
  isDone: boolean;
}): Promise<Task> {
  return (
    await fetch(
      `http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_DB_PORT}/update-task/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
        body: JSON.stringify({ isDone }),
      },
    )
  ).json();
}

export async function deleteTask(id: number): Promise<Message> {
  return (
    await fetch(
      `http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_PORT}/delete-task/${id}`,
      { method: "DELETE" },
    )
  ).json();
}

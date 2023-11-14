"use client";

import React, { useState } from "react";
import {
  SetDataOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "@/api";
import { Task } from "@/types/task.types";

function TaskBox({
  task,
  removeHandler,
}: {
  task: Task;
  removeHandler: Function;
}) {
  const [isDone, setIsDone] = useState<boolean>(task.isDone);

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({
      id,
      isDone,
    }: {
      id: number | string;
      isDone: boolean;
    }) => await updateTask({ id, isDone }),
    onSuccess: (updatedTask) => {
      setIsDone(updatedTask.isDone);
    },
  });

  return (
    <li key={Math.random()} className="bg-white p-5 m-10">
      <b>{task.id} </b>
      <p>{task.title} </p>
      <span>Status: {isDone ? "done" : "undone"} </span>
      <span>Priority: {task.priority} </span>
      <button
        className="bg-blue-400 hover:bg-blue-600"
        onClick={() => updateStatus({ id: task.id, isDone: !isDone })}
      >
        {isDone ? "Undone" : "Done"}
      </button>
      <button onClick={() => removeHandler(task.id)}>Delete</button>
    </li>
  );
}

export default TaskBox;

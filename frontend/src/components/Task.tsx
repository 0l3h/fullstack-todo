"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api";
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
    <li key={Math.random()} className="bg-white p-5 mb-10 rounded-lg">
      <span className="font-bold text-xs">ID {task.id} </span>
      <p>{task.title} </p>
      <span className="font-sm text-sm text-gray-400">
        Status: {isDone ? "Done" : "Undone"}{" "}
      </span>
      <span className="font-sm text-sm text-gray-400">
        Priority: {task.priority}{" "}
      </span>
      <div className="flex justify-end items-center gap-5">
        <button
          className="underline text-red-600"
          onClick={() => removeHandler(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-indigo-500 px-4 py-2 rounded-sm text-white"
          onClick={() => updateStatus({ id: task.id, isDone: !isDone })}
        >
          {isDone ? "Undone" : "Done"}
        </button>
      </div>
    </li>
  );
}

export default TaskBox;

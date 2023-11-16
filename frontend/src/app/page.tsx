"use client";

import { JSX } from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { createTask, deleteTask, getTasks } from "@/api";
import TaskBox from "@/components/Task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const debounce = useDebouncedCallback(
    (search: string) => setSearch(search),
    500,
  );
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", { filter, search }],
    queryFn: async () => await getTasks({ filter, search }),
  });

  const { mutate: submit } = useMutation({
    mutationFn: async () => await createTask({ title, priority }),
    onSuccess: () => {
      setTitle("");
      setPriority(0);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: removeTask } = useMutation({
    mutationFn: async (id) => await deleteTask(+id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <main className="flex flex-col lg:flex-row justify-center lg:gap-10 bg-slate-100 p-10 h-fit min-h-full">
      <div className="flex flex-col w-full lg:max-w-sm h-fit gap-5 mb-5">
        <form
          className="flex flex-col p-10 bg-white rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <h1 className="font-bold text-2xl">Todo list</h1>
          <label className="font-bold mt-5 mb-3" htmlFor="search">
            Task name
          </label>
          <input
            type="text"
            className="py-2 rounded-md border-gray-300 border border-solid px-4"
            onChange={(e) => setTitle(e.target.value)}
            required
            value={title}
            id="title"
            placeholder="Enter title here"
          />
          <label className="font-bold mt-5  mb-3" htmlFor="priority">
            Priority
          </label>
          <input
            className="py-2 rounded-md border-gray-300 border border-solid px-4"
            type="number"
            id="priority"
            required
            min={0}
            defaultValue={0}
            onChange={(e) => setPriority(+e.target.value)}
            placeholder="Priority"
          />
          <button
            className="self-end bg-indigo-500 text-sm mt-5 text-white rounded-sm py-3 px-5"
            type="submit"
          >
            Submit
          </button>
        </form>
        <form className="flex flex-col p-10 bg-white rounded-lg">
          <label className="font-bold mb-3" htmlFor="search">
            Search by
          </label>
          <input
            className="py-2 rounded-md border-gray-300 border border-solid px-4"
            type="search"
            id="search"
            onChange={(e) => debounce(e.target.value)}
            placeholder="Task title"
          />
          <label className="font-bold mt-5 mb-3" htmlFor="filter">
            Filter by
          </label>
          <select
            defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="filter"
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
        </form>
      </div>

      <ul className="w-full lg:max-w-5xl">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          tasks?.map(
            (task): JSX.Element => (
              <TaskBox
                key={Math.random()}
                task={task}
                removeHandler={removeTask}
              />
            ),
          )
        )}
        {tasks?.length === 0 && <span>There are no tasks yet</span>}
      </ul>
    </main>
  );
}

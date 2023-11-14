"use client";

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
    <main className="bg-gray-100">
      <form
        className="bg-white m-10 p-10"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="search"
          name="search"
          onChange={(e) => debounce(e.target.value)}
          placeholder="Search for task"
        />
        <select
          defaultValue={filter}
          onChange={(e) => setFilter(e.target.value)}
          name="filter"
        >
          <option value="all">all</option>
          <option value="done">done</option>
          <option value="undone">undone</option>
        </select>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
          name="title"
          placeholder="Enter title here"
        />
        <input
          type="number"
          name="priority"
          required
          value={priority}
          onChange={(e) => setPriority(+e.target.value)}
          placeholder="Priority"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
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
      </ul>
    </main>
  );
}

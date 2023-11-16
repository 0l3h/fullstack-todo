export interface Task extends TaskBody {
  id: number;
  status: "done" | "undone";
  isDone: boolean;
}

export interface TaskBody {
  title: string;
  priority: number;
}

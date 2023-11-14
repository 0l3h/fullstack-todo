export interface ITask extends TaskBody {
    id: number;
    status: string;
    isDone: boolean;
}

export interface TaskBody {
    title: string;
    priority: number;
}

export type Status = "done" | "undone";
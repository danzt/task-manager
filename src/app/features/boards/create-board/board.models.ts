import { Task } from '../task.models';

export interface Board {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

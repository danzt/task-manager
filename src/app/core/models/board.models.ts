import { Task } from '../../features/boards/task.models';

export interface Board {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

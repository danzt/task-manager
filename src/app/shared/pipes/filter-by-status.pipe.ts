import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../features/boards/task.models';

@Pipe({
  name: 'filterByStatus',
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    if (!tasks) return [];
    return tasks.filter((task) => task.status === status);
  }
}

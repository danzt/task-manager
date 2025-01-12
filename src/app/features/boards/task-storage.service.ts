import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {
  private readonly localStorageKey = 'tasks';

  private tasksSubject = new BehaviorSubject<Task[]>(this.getTasks());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  // Agregar una nueva tarea
  addTask(newTask: Task): void {
    const tasks = this.tasksSubject.value; // Obtener las tareas actuales
    tasks.push(newTask);
    this.saveTasks(tasks); // Guardar y emitir cambios
  }

  // Eliminar una tarea
  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.value.filter((task) => task.id !== taskId);
    this.saveTasks(tasks); // Guardar y emitir cambios
  }

  // Actualizar el estado de una tarea
  updateTaskStatus(taskId: number, newStatus: string): void {
    const tasks: any = this.tasksSubject.value.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    );
    this.saveTasks(tasks); // Guardar y emitir cambios
  }
}

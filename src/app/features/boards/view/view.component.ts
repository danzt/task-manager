import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { Task } from '../task.models';
import { FilterByStatusPipe } from '../../../shared/pipes/filter-by-status.pipe';
import { TaskStorageService } from '../task-storage.service';
import { BoardStorageService } from '../../../core/services/board-storage.service';

@Component({
  selector: 'app-view-board',
  imports: [
    CommonModule,
    RouterModule,
    FilterByStatusPipe,
    DragDropModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormField,
    FormsModule,
    MatLabel,
    MatSelectModule,
    MatOption,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  boardId!: number;

  types = ['To Do', 'In Progress', 'Done'];
  searchQuery: string = ''; // Para buscar por nombre
  selectedStatus: string = ''; // Para filtrar por estado

  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Task 1 description',
      status: 'To Do',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Task 2 description',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Task 3 description',
      status: 'Done',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Task 4 description',
      status: 'To Do',
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Task 5 description',
      status: 'To Do',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private boardStorageService: BoardStorageService,
    private taskStorageService: TaskStorageService, // TODO: Eliminar
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    this.tasks = this.boardStorageService.getTasksByBoardId(this.boardId);
  }

  connectedDropLists = ['To Do', 'In Progress', 'Done'];

  showNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getColumnIcon(status: string): string {
    switch (status) {
      case 'To Do':
        return 'pending_actions'; // Ícono para "Por Hacer"
      case 'In Progress':
        return 'hourglass_empty'; // Ícono para "En Progreso"
      case 'Done':
        return 'check_circle'; // Ícono para "Completado"
      default:
        return 'list'; // Ícono por defecto
    }
  }

  // All handles TODO Tasks
  createTask(): void {
    const newTask: Task = {
      id: Date.now(),
      title: 'Nueva Tarea',
      description: 'Descripción de la tarea',
      status: 'To Do',
    };
    this.tasks.push(newTask); // Agrega la tarea localmente
    this.boardStorageService.updateTasks(this.boardId, this.tasks); // Actualiza el servicio
    this.showNotification('Tarea creada con éxito');
  }

  editTask(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      const dialogRef = this.dialog.open(EditTaskDialogComponent, {
        data: { ...task },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          Object.assign(task, result); // Actualiza la tarea con los datos del modal
          this.taskStorageService.saveTasks(this.tasks); // Guardar cambios
          this.showNotification('Tarea editada con éxito');
        }
      });
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.boardStorageService.updateTasks(this.boardId, this.tasks); // Actualiza el servicio
    this.showNotification('Tarea eliminada con éxito');
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks
      .filter((task) =>
        this.selectedStatus ? task.status === this.selectedStatus : true,
      )
      .filter((task) =>
        this.searchQuery
          ? task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true,
      )
      .filter((task) => task.status === status);
  }

  onTaskDrop(event: any, newStatus: string): void {
    const task = this.tasks[event.previousIndex];
    task.status = newStatus as 'To Do' | 'In Progress' | 'Done';
    this.boardStorageService.updateTasks(this.boardId, this.tasks); // Guarda el cambio
    this.showNotification(`Tarea movida a "${newStatus}"`);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../task.models';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'], // Corregido
})
export class EditTaskDialogComponent implements OnInit {
  types = ['To Do', 'In Progress', 'Done'];
  taskForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      status: [this.data?.status || 'To Do', Validators.required],
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value); // Devolver los datos del formulario
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

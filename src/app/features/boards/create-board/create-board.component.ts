import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-board',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  boardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  save() {
    if (this.boardForm.valid) {
      // Aquí podrías guardar el tablero en un servicio o backend
      console.log('Nuevo Tablero:', this.boardForm.value);
      this.router.navigate(['/boards']); // Redirige de vuelta a la lista de tableros
    }
  }

  cancel() {
    this.router.navigate(['/boards']); // Redirige de vuelta sin guardar
  }
}

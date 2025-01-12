import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent {
  boards = [
    { id: 1, name: 'Proyecto 1', description: 'Gestión del proyecto 1' },
    { id: 2, name: 'Proyecto 2', description: 'Gestión del proyecto 2' },
  ];
  constructor(private router: Router) {}

  addBoard() {
    this.router.navigate(['/boards/new']);
  }

  openBoard(id: number) {
    this.router.navigate(['/boards', id]);
  }
}

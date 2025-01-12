import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

import { BoardCardComponent } from './board-card/board-card.component'; // Importa el componente
import { AuthService } from '../../core/services/auth.service';
import { BoardStorageService } from '../../core/services/board-storage.service';
import { Board } from '../../core/models/board.models';

@Component({
  selector: 'app-dashboard',
  imports: [
    BoardCardComponent,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  boards: Board[] = [];
  searchQuery: string = '';
  innerWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = (event.target as Window).innerWidth;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardStorageService: BoardStorageService,
  ) {}

  ngOnInit(): void {
    this.boardStorageService.boards$.subscribe((boards) => {
      this.boards = boards;
    });
  }

  filterBoards(): Board[] {
    return this.boards.filter((board) =>
      board.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  navigateToBoard(boardId: number): void {
    this.router.navigate(['/boards', boardId]);
  }

  getGridCols(): number {
    if (this.innerWidth < 600) return 1;
    if (this.innerWidth < 960) return 2;
    return 4;
  }

  getTitleSpan(): number {
    return this.innerWidth < 600 ? 1 : 3;
  }

  showMenuButton(): boolean {
    return this.innerWidth >= 600;
  }

  addBoard(): void {
    const newBoard: Board = {
      id: Date.now(),
      name: `Tablero ${this.boards.length + 1}`,
      description: 'Nuevo tablero',
      tasks: [],
    };
    this.boardStorageService.addBoard(newBoard);
  }

  removeBoard(boardId: number): void {
    this.boardStorageService.deleteBoard(boardId);
  }

  goToBoards() {
    console.log('Redirigiendo a /boards...');
    this.router.navigate(['/boards/news']);
  }

  exportBoards(): void {
    const dataStr = JSON.stringify(this.boards, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tableros.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

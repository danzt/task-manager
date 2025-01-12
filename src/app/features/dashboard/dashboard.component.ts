import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
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
import { take } from 'rxjs/operators';
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
  boards$: Observable<Board[]>; // Observable para manejar los tableros con NgRx
  searchQuery: string = '';
  innerWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = (event.target as Window).innerWidth;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar,

    private boardStorageService: BoardStorageService,
  ) {
    this.boards$ = this.boardStorageService.boards$; // Observable de tableros
  }

  filterBoards(boards: Board[]): Board[] {
    return boards.filter((board) =>
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

  showNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  addBoard(): void {
    const newBoard: Board = {
      id: Date.now(),
      name: `Tablero ${Math.floor(Math.random() * 100)}`,
      description: 'Nuevo tablero',
      tasks: [],
    };
    this.boardStorageService.addBoard(newBoard); // Agregar tablero
    this.showNotification('Tablero agregado con éxito');
  }

  removeBoard(boardId: number): void {
    this.boardStorageService.deleteBoard(boardId); // Elimina el tablero a través del servicio
    this.showNotification('Tablero eliminado con éxito');
  }

  exportBoards(): void {
    this.boards$.pipe(take(1)).subscribe((boards) => {
      const dataStr = JSON.stringify(boards, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'tableros.json';
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  goToBoards() {
    console.log('Redirigiendo a /boards...');
    this.router.navigate(['/boards/news']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

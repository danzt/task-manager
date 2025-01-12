import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../../core/models/board.models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: Board; // Recibe los datos del tablero
  @Output() viewBoard = new EventEmitter<number>(); // Evento para navegar al tablero
  @Output() deleteBoard = new EventEmitter<number>(); // Evento para eliminar el tablero

  onViewBoard(): void {
    this.viewBoard.emit(this.board.id);
  }

  onDeleteBoard(): void {
    this.deleteBoard.emit(this.board.id);
  }
}

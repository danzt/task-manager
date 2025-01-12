import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board.models';
import { Task } from '../../features/boards/task.models';
import { addBoard, updateBoard, deleteBoard } from '../../store/board.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardStorageService {
  private readonly localStorageKey = 'boards';
  private boardsSubject = new BehaviorSubject<Board[]>(this.loadBoards());
  boards$ = this.boardsSubject.asObservable();

  constructor(private store: Store) {
    this.syncWithNgRx(); // Sincronizar el estado inicial con NgRx
  }

  private loadBoards(): Board[] {
    const boards = localStorage.getItem(this.localStorageKey);
    return boards ? JSON.parse(boards) : [];
  }

  private saveBoards(boards: Board[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(boards));
    this.boardsSubject.next(boards);
  }

  private syncWithNgRx(): void {
    const boards = this.loadBoards();
    boards.forEach((board) => {
      this.store.dispatch(addBoard({ board }));
    });
  }

  getBoardById(id: number): Board | undefined {
    return this.boardsSubject.value.find((board) => board.id === id);
  }

  addBoard(board: Board): void {
    const boards = this.boardsSubject.value;
    boards.push(board);
    this.saveBoards(boards);

    // Dispara la acción de NgRx
    this.store.dispatch(addBoard({ board }));
  }

  updateBoard(updatedBoard: Board): void {
    const boards = this.boardsSubject.value.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board,
    );
    this.saveBoards(boards);

    // Dispara la acción de NgRx
    this.store.dispatch(updateBoard({ board: updatedBoard }));
  }

  deleteBoard(id: number): void {
    const boards = this.boardsSubject.value.filter((board) => board.id !== id);
    this.saveBoards(boards); // Actualiza localStorage y el BehaviorSubject

    // Dispara la acción de NgRx
    this.store.dispatch(deleteBoard({ boardId: id }));
  }

  updateTasks(boardId: number, tasks: Task[]): void {
    const boards = this.boardsSubject.value.map((board) =>
      board.id === boardId ? { ...board, tasks } : board,
    );
    this.saveBoards(boards); // Actualiza localStorage
  }
  getTasksByBoardId(boardId: number): Task[] {
    const board = this.getBoardById(boardId);
    return board ? board.tasks : [];
  }
}

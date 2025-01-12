import { Injectable } from '@angular/core';
import { Board } from '../models/board.models';
import { Task } from '../../features/boards/task.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardStorageService {
  private readonly localStorageKey = 'boards';
  private boardsSubject = new BehaviorSubject<Board[]>(this.loadBoards());
  boards$ = this.boardsSubject.asObservable();

  private loadBoards(): Board[] {
    const boards = localStorage.getItem(this.localStorageKey);
    return boards ? JSON.parse(boards) : [];
  }

  private saveBoards(boards: Board[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(boards));
    this.boardsSubject.next(boards);
  }

  getBoardById(id: number): Board | undefined {
    return this.boardsSubject.value.find((board) => board.id === id);
  }

  addBoard(board: Board): void {
    const boards = this.boardsSubject.value;
    boards.push(board); // Agrega el tablero al array
    this.saveBoards(boards); // Guarda el estado actualizado
  }

  updateBoard(updatedBoard: Board): void {
    const boards = this.boardsSubject.value.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board,
    );
    this.saveBoards(boards);
  }

  deleteBoard(id: number): void {
    const boards = this.boardsSubject.value.filter((board) => board.id !== id);
    this.saveBoards(boards);
  }

  updateTasks(boardId: number, tasks: Task[]): void {
    const boards = this.boardsSubject.value.map((board) =>
      board.id === boardId ? { ...board, tasks } : board,
    );
    this.saveBoards(boards);
  }

  getTasksByBoardId(boardId: number): Task[] {
    const board = this.getBoardById(boardId);
    return board ? board.tasks : [];
  }
}

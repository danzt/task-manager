import { createReducer, on } from '@ngrx/store';
import { addBoard, updateBoard, deleteBoard } from './board.actions';
import { Board } from '../core/models/board.models';

export interface BoardState {
  boards: Board[];
}

export const initialState: BoardState = {
  boards: [],
};

export const boardReducer = createReducer(
  initialState,
  on(addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map((b) => (b.id === board.id ? board : b)),
  })),
  on(deleteBoard, (state, { boardId }) => ({
    ...state,
    boards: state.boards.filter((board) => board.id !== boardId), // Elimina el tablero
  })),
);

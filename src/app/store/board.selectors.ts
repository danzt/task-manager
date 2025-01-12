import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const selectAllBoards = createSelector(
  selectBoardState,
  (state) => state.boards,
);

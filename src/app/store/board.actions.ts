import { createAction, props } from '@ngrx/store';
import { Board } from '../core/models/board.models';

export const loadBoards = createAction('[Board] Load Boards');
export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Board }>(),
);
export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ board: Board }>(),
);
export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardId: number }>(),
);

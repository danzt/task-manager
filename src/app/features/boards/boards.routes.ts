import { Routes } from '@angular/router';
import { BoardsComponent } from './boards.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { ViewComponent } from './view/view.component';

export const boardsRoutes: Routes = [
  { path: '', component: BoardsComponent },
  { path: 'new', component: CreateBoardComponent },
  { path: ':id', component: ViewComponent },
];

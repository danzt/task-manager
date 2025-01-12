import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BoardStorageService } from '../../core/services/board-storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: BoardStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, DashboardComponent],
      providers: [BoardStorageService],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BoardStorageService);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe filtrar tableros correctamente', () => {
    const boards = [
      { id: 1, name: 'Tablero 1', description: '', tasks: [] },
      { id: 2, name: 'Otro Tablero', description: '', tasks: [] },
    ];
    spyOn(service, 'boards$').and.returnValue(boards);
    component.searchQuery = 'Otro';
    expect(component.filterBoards()).toEqual([boards[1]]);
  });
});

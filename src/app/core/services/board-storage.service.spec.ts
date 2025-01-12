import { TestBed } from '@angular/core/testing';

import { BoardStorageService } from './board-storage.service';
import { Board } from '../models/board.models';

describe('BoardStorageService', () => {
  let service: BoardStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStorageService);

    // Reinicia el localStorage (simulado)
    localStorage.clear();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe agregar un tablero', () => {
    const board: Board = {
      id: 1,
      name: 'Tablero 1',
      description: 'Descripción',
      tasks: [],
    };
    service.addBoard(board); // Agrega el tablero

    const result = service.getBoardById(1); // Recupera el tablero agregado
    expect(result).toEqual(board); // Compara con el objeto original
  });

  it('debe actualizar un tablero', () => {
    const board: Board = {
      id: 1,
      name: 'Tablero 1',
      description: 'Descripción',
      tasks: [],
    };
    service.addBoard(board);

    const updatedBoard: Board = { ...board, name: 'Tablero Actualizado' };
    service.updateBoard(updatedBoard);

    const result = service.getBoardById(1);
    expect(result?.name).toBe('Tablero Actualizado');
  });

  it('debe eliminar un tablero', () => {
    const board: Board = {
      id: 1,
      name: 'Tablero 1',
      description: 'Descripción',
      tasks: [],
    };
    service.addBoard(board);

    service.deleteBoard(1);

    const result = service.getBoardById(1);
    expect(result).toBeUndefined();
  });
});

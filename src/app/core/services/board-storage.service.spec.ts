import { TestBed } from '@angular/core/testing';

import { BoardStorageService } from './board-storage.service';

describe('BoardStorageService', () => {
  let service: BoardStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

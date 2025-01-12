import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  beforeEach(() => {
    const authServiceStub = {
      isAuthenticated: () => true,
    };
    const routerStub = {
      navigate: () => {},
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthGuard, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {});
});

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service'; // Ensure Auth is correctly exported

describe('Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

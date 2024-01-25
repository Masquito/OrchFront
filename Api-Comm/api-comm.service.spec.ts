import { TestBed } from '@angular/core/testing';

import { APICOMMService } from './api-comm.service';

describe('APICOMMService', () => {
  let service: APICOMMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APICOMMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

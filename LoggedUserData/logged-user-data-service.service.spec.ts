import { TestBed } from '@angular/core/testing';

import { LoggedUserDataServiceService } from './logged-user-data-service.service';

describe('LoggedUserDataServiceService', () => {
  let service: LoggedUserDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

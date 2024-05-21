import { TestBed } from '@angular/core/testing';

import { XdService } from './xd.service';

describe('XdService', () => {
  let service: XdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

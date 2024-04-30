import { TestBed } from '@angular/core/testing';

import { TokenContainerService } from './token-container.service';

describe('TokenContainerService', () => {
  let service: TokenContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

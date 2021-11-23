import { TestBed } from '@angular/core/testing';

import { DealsHttpService } from './deals-http.service';

describe('DealsHttpService', () => {
  let service: DealsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

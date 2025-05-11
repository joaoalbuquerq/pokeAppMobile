import { TestBed } from '@angular/core/testing';

import { LutaServiceService } from './luta-service.service';

describe('LutaServiceService', () => {
  let service: LutaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LutaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

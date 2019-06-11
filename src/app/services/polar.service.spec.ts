import { TestBed } from '@angular/core/testing';

import { PolarService } from './polar.service';

describe('PolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolarService = TestBed.get(PolarService);
    expect(service).toBeTruthy();
  });
});

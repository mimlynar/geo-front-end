import { TestBed } from '@angular/core/testing';

import { PolarTaskService } from './polar-task.service';

describe('PolarTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolarTaskService = TestBed.get(PolarTaskService);
    expect(service).toBeTruthy();
  });
});

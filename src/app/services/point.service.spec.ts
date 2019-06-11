import {getTestBed, TestBed} from '@angular/core/testing';

import {PointService} from './point.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PointService', () => {
  let injector: TestBed;
  let service: PointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PointService]
  });
    injector = getTestBed();
    service = injector.get(PointService);
  });




});



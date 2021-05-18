import { TestBed } from '@angular/core/testing';

import { SenseedgeService } from './senseedge.service';

describe('SenseedgeService', () => {
  let service: SenseedgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenseedgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

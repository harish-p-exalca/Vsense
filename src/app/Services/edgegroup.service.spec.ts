import { TestBed } from '@angular/core/testing';

import { EdgegroupService } from './edgegroup.service';

describe('EdgegroupService', () => {
  let service: EdgegroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdgegroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

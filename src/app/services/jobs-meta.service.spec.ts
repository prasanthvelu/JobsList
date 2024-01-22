import { TestBed } from '@angular/core/testing';

import { JobsMetaService } from './jobs-meta.service';

describe('JobsMetaService', () => {
  let service: JobsMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChangeDataService } from './change-data.service';

describe('ChangeDataService', () => {
  let service: ChangeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

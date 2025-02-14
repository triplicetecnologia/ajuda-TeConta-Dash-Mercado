import { TestBed } from '@angular/core/testing';

import { LojaserviceService } from './lojaservice.service';

describe('LojaserviceService', () => {
  let service: LojaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LojaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

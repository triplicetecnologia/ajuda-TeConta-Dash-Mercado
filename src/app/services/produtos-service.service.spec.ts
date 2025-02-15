import { TestBed } from '@angular/core/testing';

import { ProdutosServiceService } from './produtos-service.service';

describe('ProdutosServiceService', () => {
  let service: ProdutosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

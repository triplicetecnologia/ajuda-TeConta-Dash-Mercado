import { TestBed } from '@angular/core/testing';

import { AnunciosServiceService } from './anuncios-service.service';

describe('AnunciosServiceService', () => {
  let service: AnunciosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnunciosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

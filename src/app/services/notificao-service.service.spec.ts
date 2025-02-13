import { TestBed } from '@angular/core/testing';

import { NotificaoServiceService } from './notificao-service.service';

describe('NotificaoServiceService', () => {
  let service: NotificaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

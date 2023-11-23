import { TestBed } from '@angular/core/testing';

import { CarouselIstruttoriService } from './carousel-istruttori.service';

describe('CarouselIstruttoriService', () => {
  let service: CarouselIstruttoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselIstruttoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

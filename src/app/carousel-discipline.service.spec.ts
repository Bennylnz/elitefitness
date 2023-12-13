import { TestBed } from '@angular/core/testing';

import { CarouselDisciplineService } from './carousel-discipline.service';

describe('CarouselDisciplineService', () => {
  let service: CarouselDisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselDisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

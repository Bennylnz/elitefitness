import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDisciplineComponent } from './carousel-discipline.component';

describe('CarouselDisciplineComponent', () => {
  let component: CarouselDisciplineComponent;
  let fixture: ComponentFixture<CarouselDisciplineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselDisciplineComponent]
    });
    fixture = TestBed.createComponent(CarouselDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

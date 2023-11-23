import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselIstruttoriComponent } from './carousel-istruttori.component';

describe('CarouselIstruttoriComponent', () => {
  let component: CarouselIstruttoriComponent;
  let fixture: ComponentFixture<CarouselIstruttoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselIstruttoriComponent]
    });
    fixture = TestBed.createComponent(CarouselIstruttoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

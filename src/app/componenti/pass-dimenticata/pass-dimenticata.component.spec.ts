import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDimenticataComponent } from './pass-dimenticata.component';

describe('PassDimenticataComponent', () => {
  let component: PassDimenticataComponent;
  let fixture: ComponentFixture<PassDimenticataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassDimenticataComponent]
    });
    fixture = TestBed.createComponent(PassDimenticataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

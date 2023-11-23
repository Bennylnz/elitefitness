import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaemailComponent } from './verificaemail.component';

describe('VerificaemailComponent', () => {
  let component: VerificaemailComponent;
  let fixture: ComponentFixture<VerificaemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificaemailComponent]
    });
    fixture = TestBed.createComponent(VerificaemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

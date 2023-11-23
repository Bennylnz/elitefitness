import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatiComponent } from './form-dati.component';

describe('FormDatiComponent', () => {
  let component: FormDatiComponent;
  let fixture: ComponentFixture<FormDatiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDatiComponent]
    });
    fixture = TestBed.createComponent(FormDatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

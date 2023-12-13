import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModificaComponent } from './form-modifica.component';

describe('FormModificaComponent', () => {
  let component: FormModificaComponent;
  let fixture: ComponentFixture<FormModificaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModificaComponent]
    });
    fixture = TestBed.createComponent(FormModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

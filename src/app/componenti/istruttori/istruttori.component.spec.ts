import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstruttoriComponent } from './istruttori.component';

describe('IstruttoriComponent', () => {
  let component: IstruttoriComponent;
  let fixture: ComponentFixture<IstruttoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IstruttoriComponent]
    });
    fixture = TestBed.createComponent(IstruttoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

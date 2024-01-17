import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDatoDialogComponent } from './modifica-dato-dialog.component';

describe('ModificaDatoDialogComponent', () => {
  let component: ModificaDatoDialogComponent;
  let fixture: ComponentFixture<ModificaDatoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaDatoDialogComponent]
    });
    fixture = TestBed.createComponent(ModificaDatoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

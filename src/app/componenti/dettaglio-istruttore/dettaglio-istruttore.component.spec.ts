import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioIstruttoreComponent } from './dettaglio-istruttore.component';

describe('DettaglioIstruttoreComponent', () => {
  let component: DettaglioIstruttoreComponent;
  let fixture: ComponentFixture<DettaglioIstruttoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DettaglioIstruttoreComponent]
    });
    fixture = TestBed.createComponent(DettaglioIstruttoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoloDetailComponent } from './articolo-detail.component';

describe('ArticoloDetailComponent', () => {
  let component: ArticoloDetailComponent;
  let fixture: ComponentFixture<ArticoloDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticoloDetailComponent]
    });
    fixture = TestBed.createComponent(ArticoloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

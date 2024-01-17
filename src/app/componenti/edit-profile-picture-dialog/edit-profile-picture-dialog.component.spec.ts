import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePictureDialogComponent } from './edit-profile-picture-dialog.component';

describe('EditProfilePictureDialogComponent', () => {
  let component: EditProfilePictureDialogComponent;
  let fixture: ComponentFixture<EditProfilePictureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfilePictureDialogComponent]
    });
    fixture = TestBed.createComponent(EditProfilePictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

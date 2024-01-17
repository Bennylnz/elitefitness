import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 

@Component({
  selector: 'app-edit-profile-picture-dialog',
  templateUrl: './edit-profile-picture-dialog.component.html',
})
export class EditProfilePictureDialogComponent {
  imageChangedEvent: any = '';

  constructor(
    public dialogRef: MatDialogRef<EditProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fotoURL: string },
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage 
  ) {}

  async onSave() {
    try {
      const user = await this.afAuth.currentUser;

      if (user && this.imageChangedEvent) {
        const file = this.imageChangedEvent.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event: any) => {
          const newFotoURL = event.target.result;

          // Delete the previous image from Firebase Storage
          await this.deletePreviousImage();

          // Update the fotoURL property in the component
          this.data.fotoURL = newFotoURL;

          // Upload the new image to Firebase Storage
          const uid = user.uid;
          const filePath = `profile_images/${uid}`;
          const storageRef = this.storage.ref(filePath);
          const uploadTask = storageRef.putString(newFotoURL, 'data_url');

          uploadTask.then(async (snapshot) => {
            // Update the fotoURL field in Firestore with the new image URL
            const downloadURL = await snapshot.ref.getDownloadURL();
            this.firestore.collection('utenti').doc(uid).update({
              fotoURL: downloadURL,
            });

            // Close the dialog with the new fotoURL
            this.dialogRef.close(downloadURL);
          });
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // Metodo per eliminare l'immagine precedente da Firebase Storage
// Metodo per eliminare l'immagine precedente da Firebase Storage
private async deletePreviousImage() {
  const user = await this.afAuth.currentUser;

  if (user && this.data.fotoURL) {
    const fileName = this.data.fotoURL.split('/').pop();
    

    if (fileName) {
      const filePath = `profile_images/${user.uid}`;
      const storageRef = this.storage.ref(filePath.replace(/%2F/g, '/'));
      try {
        // Verifica l'esistenza dell'oggetto prima di eliminarlo
        const exists = storageRef.child(fileName).getMetadata();
        if (exists) {
          storageRef.delete();
        }
      } catch (error) {
        // Gestisci l'errore se l'oggetto non esiste
        console.error('Error deleting previous image:', error);
      }
    }
  }
}

}

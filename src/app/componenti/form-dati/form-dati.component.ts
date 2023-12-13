// form-dati.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-form-dati',
  templateUrl: './form-dati.component.html',
  styleUrls: ['./form-dati.component.css']
})
export class FormDatiComponent {

  nomeFormControl = new FormControl('', [Validators.required]); 
  cognomeFormControl = new FormControl('', [Validators.required]);
  codiceFiscaleFormControl  = new FormControl('', [Validators.required, Validators.minLength(11)]);
  dataDiNascitaFormControl  = new FormControl('', [Validators.required]);


  form: FormGroup;
  newName: string = '';
  nuovoCognome: string;
  nuovaDataDiNascita: string;
  nuovoCodiceFiscale: string;
  selectedFile: File;
  downloadURL: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataServiceService,
    private router: Router,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.form = this.fb.group({
      newName: ['', Validators.required],      
      nuovoCognome: ['', Validators.required],
      nuovaDataDiNascita: ['', Validators.required],
      nuovoCodiceFiscale: ['', [Validators.required]],
      photo: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.nuovoCodiceFiscale && this.nuovoCodiceFiscale.length >= 11) {
      if (this.newName.trim() !== '') {
        this.authService.UpdateProfile(this.newName.trim());
      }

      this.dataService.aggiornaCognome(this.nuovoCognome);
      this.dataService.aggiornaDataNascita(this.nuovaDataDiNascita);
      this.dataService.aggiornaCodiceFiscale(this.nuovoCodiceFiscale);

      // Carica l'immagine solo se è stata selezionata
      if (this.selectedFile) {
        const filePath = `/images/${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
  
        // Ottieni la URL di download una volta che il caricamento è completato
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.downloadURL = url;
  
              // Aggiorna il documento dell'utente nel database Firestore con l'URL dell'immagine
              this.afAuth.authState.subscribe(user => {
                if (user) {
                  const uid = user.uid;
                  const userDoc = this.firestore.collection('utenti').doc(uid);
  
                  userDoc.set({ photoURL: this.downloadURL }, { merge: true })
                    .then(() => {
                      console.log('URL dell\'immagine salvato nel Firestore.');
                    })
                    .catch(error => {
                      console.error('Errore durante il salvataggio dell\'URL dell\'immagine:', error);
                    });
                }
              });
            });
          })
        ).subscribe();
      }

      this.router.navigate(['/profilo']);
      this.toastr.success('Dati profilo inseriti correttamente');
    } else {
      this.toastr.error('Il codice fiscale deve avere 11 caratteri');
    }
  }
}

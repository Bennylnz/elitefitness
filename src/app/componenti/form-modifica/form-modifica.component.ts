import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-form-modifica',
  templateUrl: './form-modifica.component.html',
  styleUrls: ['./form-modifica.component.css']
})
export class FormModificaComponent {

  nomeFormControl = new FormControl('', [Validators.required]);
  cognomeFormControl = new FormControl('', [Validators.required]);
  codiceFiscaleFormControl = new FormControl('', [Validators.required, Validators.minLength(11)]);
  dataDiNascitaFormControl = new FormControl('', [Validators.required]);

  myForm: FormGroup;
  newName: string = '';
  newNameTouched: boolean = false;

  nuovoCognome: string = '';
  nuovoCognomeTouched: boolean = false;

  nuovaDataDiNascita: string = '';
  nuovaDataDiNascitaTouched: boolean = false;

  nuovoCodiceFiscale: string = '';
  nuovoCodiceFiscaleTouched: boolean = false;

  selectedFile: File;
  downloadURL: string;


  userDisplayName: string;
  cognome: string;
  dataDiNascita: string;
  codiceFiscale: string;
  photoURL: string;  // Aggiunta variabile per l'URL dell'immagine

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataServiceService,
    private router: Router,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
    ) {}
    
    ngOnInit() {    
    // Recupera i dati dell'utente dal Firestore quando l'utente è autenticato
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.firestore.collection('utenti').doc(uid).valueChanges().subscribe(userData => {
        })
        this.firestore.collection('users').doc(uid).valueChanges().subscribe(userData => {
          this.userDisplayName = userData['displayName'];          
        })
        ;
      }
    });
    // Abbonati ai cambiamenti del cognome, data di nascita e codice fiscale  
    this.dataService.cognome.subscribe(nuovoCognome => {
      this.cognome = nuovoCognome;
    });

    this.dataService.dataNascita.subscribe(nuovaDataDiNascita => {
      this.dataDiNascita = nuovaDataDiNascita;
    });

    this.dataService.codiceFiscale.subscribe(nuovoCodiceFiscale => {
      this.codiceFiscale = nuovoCodiceFiscale;
    });
       // Recupera l'URL dell'immagine dal Firestore
       this.afAuth.authState.subscribe(user => {
        if (user) {
          const uid = user.uid;
          this.firestore.collection('utenti').doc(uid).valueChanges().subscribe(userData => {
            this.photoURL = userData['photoURL'];
          });
        }
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

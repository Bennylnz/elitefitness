import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  cognome: string;
  dataDiNascita: string;
  codiceFiscale: string;
  photoURL: string;  // Aggiunta variabile per l'URL dell'immagine

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataServiceService,
    private router: Router,
    public toastr : ToastrService
  ) {}

  ngOnInit() {
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

  async deleteAccount() {
    const user = this.afAuth.currentUser;

    if (user) {
      try {
        // Elimina l'utente da Firebase Authentication
        await (await user).delete();

        // Elimina il record corrispondente da Firestore
        const uid = (await user).uid;
        await this.firestore.collection('utenti').doc(uid).delete();
        await this.firestore.collection('users').doc(uid).delete();     
        this.toastr.success('Dati eliminati correttamente')
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Errore durante la cancellazione dell\'utente o del record da Firestore:', error);
      }
    }
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.toastr.success('E-mail di verifica inviata correttamente, controlla la tua casella posta in arrivo e clicca nel link per verificare la tua E-mail')

      });
  }

  
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, } from '@angular/material/dialog';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  cognome: string;
  dataDiNascita: string;
  codiceFiscale: string;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataServiceService,
    private router: Router,
    public dialog: MatDialog
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

        console.log('Utente eliminato da Firestore.');

        // Puoi aggiungere una logica di reindirizzamento o mostrare un messaggio di successo qui.
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Errore durante la cancellazione dell\'utente o del record da Firestore:', error);
      }
    }
  }

  
}

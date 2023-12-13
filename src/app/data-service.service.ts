import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private nomeSource = new BehaviorSubject<string>('');
  private cognomeSource = new BehaviorSubject<string>('');
  private dataNascitaSource = new BehaviorSubject<string>('');
  private codiceFiscaleSource = new BehaviorSubject<string>('');

  nome = this.nomeSource.asObservable();
  cognome = this.cognomeSource.asObservable();
  dataNascita = this.dataNascitaSource.asObservable();
  codiceFiscale = this.codiceFiscaleSource.asObservable();

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.caricaDatiDaFirestore();
  }

  private async caricaDatiDaFirestore() {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Recupera i dati dal documento dell'utente in Firestore
        userDoc.valueChanges().subscribe((data: any) => {
          if (data) {
            this.nomeSource.next(data.nome || '');
            this.cognomeSource.next(data.cognome || '');
            this.dataNascitaSource.next(data.dataNascita || '');
            this.codiceFiscaleSource.next(data.codiceFiscale || '');
          }
        });
      }
    });
  }

  aggiornaNome(nuovoNome: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con il nuovo nome
        await userDoc.set({ nome: nuovoNome }, { merge: true });
      }
    });
  }

  aggiornaCognome(nuovoCognome: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con il nuovo cognome
        await userDoc.set({ cognome: nuovoCognome }, { merge: true });
      }
    });
  }

  aggiornaDataNascita(nuovaDataNascita: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con la nuova data di nascita
        await userDoc.set({ dataNascita: nuovaDataNascita }, { merge: true });
      }
    });
  }

  aggiornaCodiceFiscale(nuovoCodiceFiscale: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con il nuovo codice fiscale
        await userDoc.set({ codiceFiscale: nuovoCodiceFiscale }, { merge: true });
      }
    });
  }
}

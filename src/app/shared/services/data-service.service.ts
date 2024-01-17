import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private nomeSource = new BehaviorSubject<string>(''); 
  private dataDiNascitaSource = new BehaviorSubject<string>('');
  private codiceFiscaleSource = new BehaviorSubject<string>('');
  private numeroTelefonoSource = new BehaviorSubject<string>('');


  nome = this.nomeSource.asObservable();
  
  dataDiNascita = this.dataDiNascitaSource.asObservable();
  codiceFiscale = this.codiceFiscaleSource.asObservable();
  numeroTelefono = this.numeroTelefonoSource.asObservable();


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
            this.dataDiNascitaSource.next(data.dataDiNascita || '');
            this.codiceFiscaleSource.next(data.codiceFiscale || '');
            this.numeroTelefonoSource.next(data.numeroTelefono || '');
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


  aggiornaDataNascita(nuovaDataDiNascita: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con la nuova data di nascita
        await userDoc.set({ dataDiNascita: nuovaDataDiNascita }, { merge: true });
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

  aggiornaNumeroTelefono(nuovoNumeroTelefono: string) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const uid = user.uid;
        const userDoc = this.firestore.collection('utenti').doc(uid);

        // Aggiorna il documento dell'utente in Firestore con il nuovo numero di telefono
        await userDoc.set({ numeroTelefono: nuovoNumeroTelefono }, { merge: true });
      }
    });
  }
}

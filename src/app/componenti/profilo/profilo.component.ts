import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  cognome: string;
  dataDiNascita: string;
  codiceFiscale: string;
  numeroTelefono: string;
  photoURL: string;  // Aggiunta variabile per l'URL dell'immagine

  isUserWithEmailAllowed: boolean = false;
  users: any[] = []; // Aggiungi un array per memorizzare i dati degli utenti
  utentiData: any[] = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['displayName', 'cognome', 'email', 'uid']; // Add more columns if needed

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataServiceService,
    private router: Router,
    public toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    // Subscribe to changes in cognome, dataNascita, and codiceFiscale
    this.dataService.cognome.subscribe((nuovoCognome: string) => {
      this.cognome = nuovoCognome;
    });
  
    this.dataService.dataNascita.subscribe((nuovaDataDiNascita: string) => {
      this.dataDiNascita = nuovaDataDiNascita;
    });
  
    this.dataService.codiceFiscale.subscribe((nuovoCodiceFiscale: string) => {
      this.codiceFiscale = nuovoCodiceFiscale;
    });
    this.dataService.numeroTelefono.subscribe((nuovoNumeroTelefono: string) => {
      this.numeroTelefono = nuovoNumeroTelefono;
    });
  
    // Retrieve the image URL from Firestore
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        this.firestore.collection('utenti').doc(uid).valueChanges().subscribe((userData: any) => {
          this.photoURL = userData['photoURL'];
        });
      }
    });
  
    // Subscribe to changes in userEmail
    this.authService.userEmail.subscribe((email: string) => {
      this.isUserWithEmailAllowed = this.isAllowedEmail(email);
  
      if (this.isUserWithEmailAllowed) {
        // Retrieve data from the 'users' collection
        this.firestore.collection('users').valueChanges().subscribe((data: any[]) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  
        // Retrieve data from the 'utenti' collection
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            const uid = user.uid;
            this.firestore.collection('utenti').doc(uid).valueChanges().subscribe((userData) => {
              this.utentiData = [userData];
            });
          }
        });
      }
    });
  }
  

  private isAllowedEmail(email: string): boolean {
    // Aggiungi la tua logica per determinare se l'email dell'utente è consentita
    return email === 'bennylanza@gmail.com';
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

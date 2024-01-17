import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataServiceService } from 'src/app/shared/services/data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { ModificaDatoDialogComponent } from '../modifica-dato-dialog/modifica-dato-dialog.component';
import { EditProfilePictureDialogComponent } from '../edit-profile-picture-dialog/edit-profile-picture-dialog.component';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
 
  dataDiNascita: string;
  codiceFiscale: string;
  numeroTelefono: string;
  fotoURL: string;  // Aggiunta variabile per l'URL dell'immagine

  campoInModifica: string = ''; // Variabile per tenere traccia di quale campo viene modificato
  valoreModificato: string = ''; // Variabile per memorizzare il valore modificato

  isUserWithEmailAllowed: boolean = false;
  users: any[] = []; // Aggiungi un array per memorizzare i dati degli utenti
  utentiData: any[] = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['displayName',  'email' , 'dataDiNascita' , 'codiceFiscale' , 'numeroTelefono', 'emailVerified']; // Add more columns if needed

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataService: DataServiceService,
    private router: Router,
    public toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    
    this.dataService.dataDiNascita.subscribe((nuovaDataDiNascita: string) => {
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
          this.fotoURL = userData['fotoURL'];
        });
      }
    });
  
    // Subscribe to changes in userEmail
    this.authService.userEmail.subscribe((email: string) => {
      this.isUserWithEmailAllowed = this.isAllowedEmail(email);
  
      if (this.isUserWithEmailAllowed) {
        // Retrieve data from the 'users' collection
        this.firestore.collection('utenti').valueChanges().subscribe((data: any[]) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });        
      }
    });
  }
  

  private isAllowedEmail(email: string): boolean {
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


  modificaDato(campo: string) {
    this.campoInModifica = campo;
    this.valoreModificato = this[campo];
  
    const dialogRef = this.dialog.open(ModificaDatoDialogComponent, {
      width: '400px',
      data: { campo: campo, valoreModificato: this.valoreModificato, title: this.getDialogTitle(campo) }
    });
  
    dialogRef.afterClosed().subscribe((nuovoValore: string) => {
      if (nuovoValore !== undefined) {
        // L'utente ha inserito un nuovo valore nel dialog
        this.valoreModificato = nuovoValore;
        this.salvaDatoModificato();
      } else {
        // L'utente ha annullato il dialog
        this.campoInModifica = ''; // Reimposta lo stato di modifica
      }
    });
  }
  

  getDialogTitle(campo: string): string {
    switch (campo) {
      case 'displayName':
        return 'nome e cognome';
      case 'dataDiNascita':
        return 'data di nascita';
      case 'codiceFiscale':
        return 'codice fiscale';
      case 'numeroTelefono':
        return 'numero di telefono';
      // Aggiungi altri casi se necessario
      default:
        return campo; // Ritorna il campo originale se non c'è un match
    }
  }
  
  
  salvaDatoModificato() {
    // Aggiorna il campo specifico con il valore modificato
    switch (this.campoInModifica) {
      case 'displayName':
        this.updateDisplayName();
        break;
      case 'dataDiNascita':
        this.updateDataOnFirestore('dataDiNascita');
        break;
      case 'codiceFiscale':
        this.updateDataOnFirestore('codiceFiscale');
        break;
      case 'numeroTelefono':
        this.updateDataOnFirestore('numeroTelefono');
        break;
      // Aggiungi altri casi se necessario per altri campi
    }

    // Reimposta lo stato di modifica
    this.campoInModifica = '';
  }


  async updateDisplayName() {
    const user = this.afAuth.currentUser;
  
    if (user) {
      try {
        await (await user).updateProfile({
          displayName: this.valoreModificato
        });
  
        // Aggiornamento riuscito
        this.toastr.success('Il nome è stato aggiornato con successo');
  
        // Aggiorna anche il displayName in Firestore, se necessario
        const uid = (await user).uid;
  
        // Aggiorna la tabella "users"
        await this.firestore.collection('users').doc(uid).update({ displayName: this.valoreModificato });
  
        // Aggiorna la tabella "utenti" (Assicurati che la tabella "utenti" abbia un campo "displayName")
        await this.firestore.collection('utenti').doc(uid).update({ displayName: this.valoreModificato });
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del displayName:', error);
        this.toastr.error('Si è verificato un errore durante l\'aggiornamento del nome');
      }
    }
  }
  

  async updateDataOnFirestore(field: string) {
    const user = this.afAuth.currentUser;
  
    if (user) {
      try {
        // Aggiorna il campo specifico nel profilo utente
        await (await user).updateProfile({
          [field]: this.valoreModificato
        });
  
        // Aggiornamento riuscito nel profilo utente
        this.toastr.success(`${field} è stato aggiornato con successo`);
  
        // Aggiorna anche il campo in Firestore
        const uid = (await user).uid;
  
        // Utilizza un oggetto per mappare il campo da aggiornare nel corrispondente campo su Firestore
        const fieldMapping = {
          'dataDiNascita': 'dataDiNascita',
          'codiceFiscale': 'codiceFiscale',
          'numeroTelefono': 'numeroTelefono'
          // Aggiungi altri campi se necessario
        };

        
  
        const firestoreField = fieldMapping[field];
  
        if (firestoreField) {
          // Se esiste un mapping, aggiorna il campo su Firestore
          const updateData = {};
          updateData[firestoreField] = this.valoreModificato;

          // Aggiorna la tabella "users"
          await this.firestore.collection('users').doc(uid).update(updateData);
  
          await this.firestore.collection('utenti').doc(uid).update(updateData);
  
        }
      } catch (error) {
  
        this.toastr.error(`Si è verificato un errore durante l'aggiornamento di ${field}`);
      }
    }
  }

  editProfilePicture() {
    // Open a dialog or implement your logic to allow users to edit their profile picture
    const dialogRef = this.dialog.open(EditProfilePictureDialogComponent, {
      width: '400px',
      data: { fotoURL: this.fotoURL }
    });

    dialogRef.afterClosed().subscribe((newFotoURL: string) => {
      if (newFotoURL) {
        // If a new photo URL is received, update the component's fotoURL
        this.fotoURL = newFotoURL;
        // You may also want to update the photo URL in your database
      }
    });
  }

  
  
}
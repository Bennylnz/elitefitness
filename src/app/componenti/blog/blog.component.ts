import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit{
  blogTitle: string = '';
  blogDescription: string = '';
  blogPhoto: File | null = null; // Modificato per gestire il caricamento del file
  downloadURL: string = '';
  articoli: Observable<any[]>;
  isUserWithEmailAllowed: boolean = false;
  // Aggiungi questa variabile al tuo componente TypeScript
mostraTutto: boolean = false;


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, public authService: AuthService,) {}

  ngOnInit() {
    // Ottieni la lista degli articoli dal database Firebase
    this.articoli = this.db.list('/articoli').valueChanges();

    this.authService.userEmail.subscribe((email: string) => {
      this.isUserWithEmailAllowed = this.isAllowedEmail(email);
    });
  }

  private isAllowedEmail(email: string): boolean {
    // Aggiungi la tua logica per determinare se l'email dell'utente è consentita
    return email === 'bennylanza@gmail.com';
  }

  salvaArticolo() {
    // Verifica se è stata fornita un'immagine
    if (this.blogPhoto) {
      const filePath = `articoli/${Date.now()}_${this.blogPhoto.name}`;
      const fileRef = this.storage.ref(filePath);

      // Carica l'immagine su Firebase Storage
      const task = this.storage.upload(filePath, this.blogPhoto);

      // Ottieni l'URL di download dell'immagine appena caricata
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.downloadURL = url;

              // Ora puoi salvare l'articolo nel database Firebase con l'URL dell'immagine
              this.salvaArticoloNelDatabase();
            });
          })
        )
        .subscribe();
    } else {
      // Se non è stata fornita un'immagine, salva direttamente l'articolo nel database
      this.salvaArticoloNelDatabase();
    }
  }

  private salvaArticoloNelDatabase() {
    // Crea un oggetto con i dati dell'articolo
    const articolo = {
      title: this.blogTitle,
      description: this.blogDescription,
      photo: this.downloadURL || '', // Utilizza l'URL dell'immagine se disponibile
    };

    // Salva l'articolo nel database Firebase
    this.db.list('/articoli').push(articolo);

    // Resetta i campi dopo il salvataggio
    this.blogTitle = '';
    this.blogDescription = '';
    this.blogPhoto = null;
    this.downloadURL = '';
  }

  gestisciFileInput(files: FileList | null) {
    if (files && files.length > 0) {
      this.blogPhoto = files[0];
    }
  }
}

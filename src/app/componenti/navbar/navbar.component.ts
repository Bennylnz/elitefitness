import { Component, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userDisplayName: string;
 
  fotoURL: string;
  
  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
    ){}

  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }

  ngOnInit(event: Event) {
    this.checkScreenSize(); 
    // Recupera i dati dell'utente dal Firestore quando l'utente è autenticato
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.firestore.collection('utenti').doc(uid).valueChanges().subscribe(userData => {
        
          this.fotoURL = userData['fotoURL'];
        })
        this.firestore.collection('users').doc(uid).valueChanges().subscribe(userData => {
          this.userDisplayName = userData['displayName'];
          
        })
        ;
      }
    });
  }

  isNavbarScrolled: boolean = false;
  isDarkTheme: boolean = true;
  isMobileView = false;  
 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarScrolled = window.scrollY > 80;
    this.isDarkTheme = !this.isNavbarScrolled;
  }
  
  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768; // Imposta la larghezza a 768 px in base alle necessità del tuo design responsivo  
  }

}

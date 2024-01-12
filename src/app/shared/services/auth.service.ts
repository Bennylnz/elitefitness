import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { getAuth, updateProfile } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
declare var window: any;
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class AuthService {
  userData: any; // Save logged in user data

  private userEmailSource = new BehaviorSubject<string>('');
  userEmail = this.userEmailSource.asObservable();


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastr: ToastrService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmailSource.next(user.email || ''); // Invia l'email all'observable
      }
    });

    
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['profilo']);
          }
        });
        

      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificaemail']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ;
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    // Riferimento per la collezione "users"
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  
    // Riferimento per la collezione "utenti"
    const utentiRef: AngularFirestoreDocument<any> = this.afs.doc(`utenti/${user.uid}`);
  
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
  
    // Aggiorna i dati nella collezione "users"
    userRef.set(userData, { merge: true });
  
    // Aggiorna i dati nella collezione "utenti"
    utentiRef.set(userData, { merge: true });
  
    return Promise.all([userRef, utentiRef]);
  }
  

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  

  async UpdateProfile(displayName: string) {
    const user = (await this.afAuth.currentUser);

    const profile = {
        displayName: displayName,
        photoURL: user.photoURL,
    }; 

    await user.updateProfile(profile);
    this.SetUserData(user);
}



}
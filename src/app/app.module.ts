import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './componenti/landing/landing.component';
import { LoginComponent } from './componenti/login/login.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { RegistratiComponent } from './componenti/registrati/registrati.component';
import { PassDimenticataComponent } from './componenti/pass-dimenticata/pass-dimenticata.component';
import { VerificaemailComponent } from './componenti/verificaemail/verificaemail.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { register } from 'swiper/element/bundle';
register();
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './componenti/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { DettaglioIstruttoreComponent } from './componenti/dettaglio-istruttore/dettaglio-istruttore.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from './shared/services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


 


// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { CarouselIstruttoriComponent } from './componenti/carousel-istruttori/carousel-istruttori.component';
import { CarouselDisciplineComponent } from './componenti/carousel-discipline/carousel-discipline.component';
import { FormDatiComponent } from './componenti/form-dati/form-dati.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FooterComponent } from './componenti/footer/footer.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ModificaDatoDialogComponent } from './componenti/modifica-dato-dialog/modifica-dato-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    NavbarComponent,
    RegistratiComponent,
    PassDimenticataComponent,
    VerificaemailComponent,
    ProfiloComponent,
    CarouselIstruttoriComponent,
    CarouselDisciplineComponent,
    FormDatiComponent,
    SpinnerComponent,
    DettaglioIstruttoreComponent,
    FooterComponent,
    ModificaDatoDialogComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"elitefitness-c60bf","appId":"1:771953938788:web:4e005aac6b365e94c22a71","storageBucket":"elitefitness-c60bf.appspot.com","apiKey":"AIzaSyDoCQdk6XCUDYX-IDNKl2m6f16KilTCCIM","authDomain":"elitefitness-c60bf.firebaseapp.com","messagingSenderId":"771953938788","measurementId":"G-J5QJ09XZC7"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    AuthService, // Incluso il servizio nei providers
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

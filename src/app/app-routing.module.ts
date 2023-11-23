import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './componenti/landing/landing.component';
import { LoginComponent } from './componenti/login/login.component';
import { IstruttoriComponent } from './componenti/istruttori/istruttori.component';
import { RegistratiComponent } from './componenti/registrati/registrati.component';
import { PassDimenticataComponent } from './componenti/pass-dimenticata/pass-dimenticata.component';
import { VerificaemailComponent } from './componenti/verificaemail/verificaemail.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { FormDatiComponent } from './componenti/form-dati/form-dati.component';
import { DettaglioIstruttoreComponent } from './componenti/dettaglio-istruttore/dettaglio-istruttore.component';

const routes: Routes = [
    {path: '', component: LandingComponent, },
    {path: '', redirectTo: 'landing', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'istruttori', component: IstruttoriComponent},    
    {path: 'registrati', component: RegistratiComponent },    
    {path: 'passdimenticata', component: PassDimenticataComponent },
    {path: 'verificaemail', component: VerificaemailComponent },
    {path: 'profilo', component: ProfiloComponent },
    {path: 'datipersonali', component: FormDatiComponent },
    {path: 'dettaglio/:id', component: DettaglioIstruttoreComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
;
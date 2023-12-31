import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './componenti/landing/landing.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistratiComponent } from './componenti/registrati/registrati.component';
import { PassDimenticataComponent } from './componenti/pass-dimenticata/pass-dimenticata.component';
import { VerificaemailComponent } from './componenti/verificaemail/verificaemail.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { FormDatiComponent } from './componenti/form-dati/form-dati.component';
import { DettaglioIstruttoreComponent } from './componenti/dettaglio-istruttore/dettaglio-istruttore.component';
import { FormModificaComponent } from './componenti/form-modifica/form-modifica.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
    {path: '', component: LandingComponent, },
    {path: '', redirectTo: 'landing', pathMatch:'full'},
    {path: 'login', component: LoginComponent},  
    {path: 'registrati', component: RegistratiComponent },    
    {path: 'passdimenticata', component: PassDimenticataComponent },
    {path: 'verificaemail', component: VerificaemailComponent },
    {path: 'profilo', component: ProfiloComponent , canActivate: [AuthGuard]},
    {path: 'datipersonali', component: FormDatiComponent ,canActivate: [AuthGuard] },
    {path: 'modificadatipersonali', component: FormModificaComponent ,canActivate: [AuthGuard] },
    {path: 'dettaglio/:id', component: DettaglioIstruttoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
;
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataServiceService } from 'src/app/data-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-form-dati',
  templateUrl: './form-dati.component.html',
  styleUrls: ['./form-dati.component.css']
})


export class FormDatiComponent {
  form: FormGroup;
  newName: string = '';
  nuovoCognome: string;
  nuovaDataDiNascita: string;
  nuovoCodiceFiscale: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    // Verifica se il codice fiscale ha almeno 11 caratteri
    if (this.nuovoCodiceFiscale && this.nuovoCodiceFiscale.length >= 11) {
      // Continua solo se il codice fiscale è valido
      if (this.newName.trim() !== '') {
        this.authService.UpdateProfile(this.newName.trim());
      }

      this.dataService.aggiornaCognome(this.nuovoCognome);
      this.dataService.aggiornaDataNascita(this.nuovaDataDiNascita);
      this.dataService.aggiornaCodiceFiscale(this.nuovoCodiceFiscale);

      // Puoi aggiungere una logica di reindirizzamento qui se necessario
      this.router.navigate(['/profilo']);
      this.toastr.success('Dati profilo inseriti correttamente');
    } else {
      // Gestisci il caso in cui il codice fiscale non è valido
      this.toastr.error('Il codice fiscale deve avere 11 caratteri');
    }
  }
}


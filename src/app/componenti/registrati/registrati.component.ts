import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";


@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent {
  constructor( public authService: AuthService ) { }
}

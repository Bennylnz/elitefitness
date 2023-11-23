import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
@Component({
  selector: 'app-verificaemail',
  templateUrl: './verificaemail.component.html',
  styleUrls: ['./verificaemail.component.css']
})
export class VerificaemailComponent {
  constructor( public authService: AuthService ) { }
}

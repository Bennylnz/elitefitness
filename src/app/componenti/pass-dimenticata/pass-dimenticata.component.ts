import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-pass-dimenticata',
  templateUrl: './pass-dimenticata.component.html',
  styleUrls: ['./pass-dimenticata.component.css']
})
export class PassDimenticataComponent {
  constructor( public authService: AuthService ) { }
}

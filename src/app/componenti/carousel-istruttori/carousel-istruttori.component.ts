import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselIstruttoriService } from 'src/app/carousel-istruttori.service';
import { DialogService } from '../../dialog.service';


@Component({
  selector: 'app-carousel-istruttori',
  templateUrl: './carousel-istruttori.component.html',
  styleUrls: ['./carousel-istruttori.component.css']
})
export class CarouselIstruttoriComponent {
constructor(private router : Router , public carouselService : CarouselIstruttoriService, private dialogService: DialogService){}

// onCardClick(istruttore: any): void {
//   this.router.navigate(['/dettaglio', istruttore.id]);
// }


openPopup(istruttore: any): void {
  this.dialogService.openPopup(istruttore);
}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselIstruttoriService } from 'src/app/carousel-istruttori.service';

@Component({
  selector: 'app-carousel-istruttori',
  templateUrl: './carousel-istruttori.component.html',
  styleUrls: ['./carousel-istruttori.component.css']
})
export class CarouselIstruttoriComponent {
constructor(private router : Router , public carouselService : CarouselIstruttoriService){}

onCardClick(istruttore: any): void {
  this.router.navigate(['/dettaglio', istruttore.id]);
}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselIstruttoriService } from 'src/app/carousel-istruttori.service';

@Component({
  selector: 'app-dettaglio-istruttore',
  templateUrl: './dettaglio-istruttore.component.html',
  styleUrls: ['./dettaglio-istruttore.component.css']
})
export class DettaglioIstruttoreComponent implements OnInit {
  selectedCard: any;

  constructor(private route: ActivatedRoute, public carouselService : CarouselIstruttoriService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const cardId = +params['id'];
      this.selectedCard = this.carouselService.istruttori.find((card) => card.id === cardId);
    });
  }
}

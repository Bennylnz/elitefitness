import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselIstruttoriService } from 'src/app/shared/services/carousel-istruttori.service';
import { DialogService } from '../../shared/services/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dettaglio-istruttore',
  templateUrl: './dettaglio-istruttore.component.html',
  styleUrls: ['./dettaglio-istruttore.component.css']
})
export class DettaglioIstruttoreComponent implements OnInit {
  selectedCard: any;

  constructor(private route: ActivatedRoute, public carouselService : CarouselIstruttoriService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.selectedCard = this.data.istruttore;
   
  }
}

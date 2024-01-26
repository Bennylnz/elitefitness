import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DettaglioIstruttoreComponent } from '../../componenti/dettaglio-istruttore/dettaglio-istruttore.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openPopup(istruttore: any): void {
    this.dialog.open(DettaglioIstruttoreComponent, {
      width: '65vw',
      height: '73vh',
      data: { istruttore },
      backdropClass: 'backdropBackground',
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modifica-dato-dialog',
  templateUrl: './modifica-dato-dialog.component.html',
  styleUrls: ['./modifica-dato-dialog.component.css']
})
export class ModificaDatoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ModificaDatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { campo: string, valoreModificato: string, title: string }
  ) { }

  
}

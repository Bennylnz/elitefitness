import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-articolo-detail',
  templateUrl: './articolo-detail.component.html',
  styleUrls: ['./articolo-detail.component.css']
})
export class ArticoloDetailComponent implements OnInit {
  articolo: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    const articleId = this.activatedRoute.snapshot.params['id'];
    this.articolo = this.db.object(`/articoli/${articleId}`).valueChanges();
  }  
}
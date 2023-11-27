import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselIstruttoriService {

  constructor() { }

  istruttori = [
    {id: 1,nome: 'Angelo Todaro' , descrizione: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas modi beatae natus amet, mollitia perferendis error qui enim veniam saepe corrupti placeat esse aperiam maxime, nostrum ratione nisi architecto?' , img : '../assets/media/test.png' , disciplina: 'Powerlifting'},
    {id: 2, nome: '1' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/301' , disciplina: 'nome disciplina'},
    {id: 3, nome: '2' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/302' , disciplina: 'nome disciplina'},
    {id: 4, nome: '3' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/303' , disciplina: 'nome disciplina'},
    {id: 5, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/304' , disciplina: 'nome disciplina'},
    {id: 6, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/305' , disciplina: 'nome disciplina'},
    {id: 7, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/306' , disciplina: 'nome disciplina'},
    {id: 8, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/307' , disciplina: 'nome disciplina'},
    {id: 9, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/308' , disciplina: 'nome disciplina'},
    {id: 10, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/309' , disciplina: 'nome disciplina'},
    {id: 11, nome: 'Angelo Todaro' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/310' , disciplina: 'nome disciplina'},
    {id: 12, nome: '12' , descrizione: 'descrizione finta', img : 'https://picsum.photos/200/311' , disciplina: 'nome disciplina'},
  ]
}



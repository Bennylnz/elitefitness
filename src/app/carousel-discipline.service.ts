import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselDisciplineService {

  constructor() { }

  discipline = [
    {id: 1,nome: 'Zumba' , descrizione: 'descrizione finta' , img : '../assets/media/test.png' },
    {id: 2, nome: 'Olistico' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/301' },
    {id: 3, nome: 'Tonificazione' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/302' },
    {id: 4, nome: 'Balli di Gruppo' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/303' },
    {id: 5, nome: 'Pump Circuit' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/304' },
    {id: 6, nome: 'Danza Moderna 7-9 Anni' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/305' },
    {id: 7, nome: 'Hip Hop Bimbi' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/306' },
    {id: 8, nome: 'Hip Hop 6-12 Anni' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/307' },
    {id: 9, nome: 'Judo' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/308' },
    {id: 10, nome: 'Karate' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/309' },
    {id: 11, nome: 'Pilates' , descrizione: 'descrizione finta' , img : 'https://picsum.photos/200/310' },
    {id: 12, nome: 'Caraibico' , descrizione: 'descrizione finta', img : 'https://picsum.photos/200/311' },
  ]
}

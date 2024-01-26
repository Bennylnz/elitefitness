import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselDisciplineService {

  constructor() { }

  discipline = [
    {id: 1,nome:  'Zumba' , descrizione: 'descrizione finta' , img : '../../../assets/media/zumba.png' },
    {id: 2, nome: 'Olistico' , descrizione: 'descrizione finta' , img : '../../../assets/media/olistico.png' },
    {id: 3, nome: 'Tonificazione' , descrizione: 'descrizione finta' , img : '../../../assets/media/tonificazione.png' },
    {id: 4, nome: 'Balli di Gruppo' , descrizione: 'descrizione finta' , img : '../../../assets/media/ballidigruppo.png' },
    {id: 5, nome: 'Pump Circuit' , descrizione: 'descrizione finta' , img : '../../../assets/media/pump.png' },
    {id: 6, nome: 'Danza Moderna' , descrizione: 'descrizione finta' , img : '../../../assets/media/danzamoderna.png' },
    {id: 7, nome: 'Hip Hop' , descrizione: 'descrizione finta' , img : '../../../assets/media/hiphop.png' },
    {id: 8, nome: 'Judo' , descrizione: 'descrizione finta' , img : '../../../assets/media/judo.png' },
    {id: 9, nome: 'Karate' , descrizione: 'descrizione finta' , img : '../../../assets/media/karate.png' },
    {id: 10, nome: 'Pilates' , descrizione: 'descrizione finta' , img : '../../../assets/media/pilates.png' },
    {id: 11, nome: 'Caraibico' , descrizione: 'descrizione finta', img : '../../../assets/media/caraibico.png' },
  ]
}

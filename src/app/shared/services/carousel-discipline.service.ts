import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselDisciplineService {

  constructor() { }

  discipline = [
    {id: 1,nome:  'Zumba' ,  img : '../../../assets/media/zumba.png' },
    {id: 2, nome: 'Olistico' ,  img : '../../../assets/media/olistico.png' },
    {id: 3, nome: 'Tonificazione' ,  img : '../../../assets/media/tonificazione.png' },
    {id: 4, nome: 'Balli di Gruppo' ,  img : '../../../assets/media/ballidigruppo.png' },
    {id: 5, nome: 'Hip Hop' ,  img : '../../../assets/media/hiphop.png' },
    {id: 6, nome: 'Pump Circuit' ,  img : '../../../assets/media/pump.png' },
    {id: 7, nome: 'Karate' ,  img : '../../../assets/media/karate.png' },
    {id: 8, nome: 'Danza Moderna' ,  img : '../../../assets/media/danzamoderna.png' },
    {id: 9, nome: 'Pilates' ,  img : '../../../assets/media/pilates.png' },
    {id: 10, nome: 'Judo' ,  img : '../../../assets/media/judo.png' },
    {id: 11, nome: 'Caraibico' , img : '../../../assets/media/caraibico.png' },
  ]
}

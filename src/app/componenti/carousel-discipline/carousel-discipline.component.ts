import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselDisciplineService } from 'src/app/carousel-discipline.service';

@Component({
  selector: 'app-carousel-discipline',
  templateUrl: './carousel-discipline.component.html',
  styleUrls: ['./carousel-discipline.component.css']
})
export class CarouselDisciplineComponent {
  constructor(private router : Router , public carouselServiceDiscipline : CarouselDisciplineService){}

}

import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import Typed from 'typed.js';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('myVideo') myVideo: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setProperty(this.myVideo.nativeElement, 'autoplay', true);
    this.renderer.setProperty(this.myVideo.nativeElement, 'muted', true);
    this.myVideo.nativeElement.load();


    const options = {
      strings: [` <p class="fw-light">Creare un <span class="fw-bold">nuovo concetto di Wellness</span> rendendo quotidianamente accessibili <span class="fw-bold">nozioni d’eccellenza</span>, formando nuove generazioni di atleti e promuovendo una <span class="fw-bold">filosofia di competitivitá costruttiva.</span></p>`],
      typeSpeed: 20,      
      startDelay: 500,
      backDelay: 600,
      showCursor: false,
      cursorChar: '|',
      loop: true

    };

    const typed = new Typed('#typed-output', options);  
  }
}

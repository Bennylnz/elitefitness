import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';


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
  }
}

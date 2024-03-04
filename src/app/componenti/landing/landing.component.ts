import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageStateService } from 'src/app/shared/services/image-state.service';
import Typed from 'typed.js';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('myVideo') myVideo: ElementRef;
  @HostBinding('class.mobile') isMobile = false;

  isUploading: boolean = false;
  imageUrl: string | null = null;
  isUserWithEmailAllowed: boolean = false;
  
  constructor(private renderer: Renderer2, private imageStateService: ImageStateService , private authService: AuthService) {
    this.checkIfMobile();
    window.onresize = () => {
    this.checkIfMobile();
    };
  }

  ngOnInit() {
       this.imageStateService.getImageUrl().subscribe((url) => {
      this.imageUrl = url;
    });

    this.authService.userEmail.subscribe((email: string) => {
      this.isUserWithEmailAllowed = this.isAllowedEmail(email);
    });
  }

  ngAfterViewInit() {
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

  checkIfMobile() {
    this.isMobile = window.innerWidth < 992; // Modifica il valore 768 con la larghezza che preferisci
  }

  isUserLoggedIn() : boolean{
    return this.authService.isLoggedIn; 
  }

  
  private isAllowedEmail(email: string): boolean {
    return email === 'bennylanza@gmail.com';
  }

  onImageUploaded(url: string) {
    this.isUploading = true;

    // Delay per garantire che l'immagine sia stata caricata completamente
    setTimeout(() => {
      this.isUploading = false;
    }, 1000);
  }

  deleteImage() {
    if (this.imageUrl) {
      // Elimina l'immagine dal database
      this.imageStateService.setImageUrl(null);
    }
  }
}

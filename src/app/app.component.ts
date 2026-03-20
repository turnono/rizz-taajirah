import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuturisticBackgroundComponent } from './core/components/futuristic-background.component';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';
import { CookiePopupComponent } from './core/components/cookie-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FuturisticBackgroundComponent, HeaderComponent, FooterComponent, CookiePopupComponent],
  template: `
    <app-futuristic-background></app-futuristic-background>
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-cookie-popup></app-cookie-popup>
  `,
  styles: [`
    :host { 
      display: block; 
      min-height: 100vh;
    }
    main {
      padding-top: 2rem;
    }
  `],
})
export class AppComponent {}
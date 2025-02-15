import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  schoolOutline,
  cartOutline,
  bagHandleOutline,
  codeSlashOutline,
  personOutline,
  gridOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-content class="sidebar-content">
            <div class="logo-container">
              <ion-img
                src="assets/images/logo/taajirah_logo_no_bg.png"
                alt="Taajirah Logo"
              ></ion-img>
              <ion-note>Technology & E-commerce Platform</ion-note>
            </div>

            <ion-list id="inbox-list" lines="none">
              <ion-menu-toggle auto-hide="false">
                <ion-item
                  routerLink="/"
                  routerLinkActive="selected"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="menu-item"
                >
                  <ion-icon slot="start" [name]="'grid-outline'"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/books"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon slot="start" [name]="'book-outline'"></ion-icon>
                  <ion-label>Digital Products</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/courses"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon slot="start" [name]="'school-outline'"></ion-icon>
                  <ion-label>Learning</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/store"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon
                    slot="start"
                    [name]="'bag-handle-outline'"
                  ></ion-icon>
                  <ion-label>Store</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/services"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon
                    slot="start"
                    [name]="'code-slash-outline'"
                  ></ion-icon>
                  <ion-label>Tech Services</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/cart"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon slot="start" [name]="'cart-outline'"></ion-icon>
                  <ion-label>Cart</ion-label>
                </ion-item>

                <ion-item
                  routerLink="/account"
                  routerLinkActive="selected"
                  class="menu-item"
                >
                  <ion-icon slot="start" [name]="'person-outline'"></ion-icon>
                  <ion-label>Account</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [
    `
      :host {
        --sidebar-bg: #1a1a1a;
        --menu-item-hover: #2a2a2a;
        --menu-text: #ffffff;
        --menu-text-secondary: rgba(255, 255, 255, 0.7);
        --menu-icon-color: #3880ff;
        --selected-color: #3880ff;
      }

      .sidebar-content {
        --background: var(--sidebar-bg);
      }

      .logo-container {
        padding: 2rem 1rem;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        ion-img {
          max-width: 160px;
          margin: 0 auto 1rem;
        }

        ion-note {
          color: var(--menu-text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }
      }

      ion-list {
        background: var(--sidebar-bg);
        padding: 1rem 0;
      }

      .menu-item {
        margin: 0.3rem 0.8rem;
        border-radius: 8px;
        --background: transparent;
        --color: var(--menu-text);
        --padding-start: 1rem;
        --padding-end: 1rem;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover {
          --background: var(--menu-item-hover);
        }

        ion-icon {
          color: var(--menu-icon-color);
          margin-right: 0.8rem;
          font-size: 1.2rem;
        }

        &.selected {
          --background: var(--selected-color);
          font-weight: 600;

          ion-icon {
            color: white;
          }
        }
      }

      @media (min-width: 992px) {
        ion-split-pane {
          --side-width: 280px;
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonImg,
  ],
})
export class AppComponent {
  constructor() {
    addIcons({
      'book-outline': bookOutline,
      'school-outline': schoolOutline,
      'cart-outline': cartOutline,
      'bag-handle-outline': bagHandleOutline,
      'code-slash-outline': codeSlashOutline,
      'person-outline': personOutline,
      'grid-outline': gridOutline,
    });
  }
}

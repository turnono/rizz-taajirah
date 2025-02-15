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
        --dark-bg: #1a1a1a;
        --sidebar-bg: #242424;
        --text-primary: #ffffff;
        --text-secondary: rgba(255, 255, 255, 0.7);
        --accent-color: #3880ff;
        --menu-item-hover: #2a2a2a;
        --menu-item-active: #2a2a2a;
        --menu-item-border: rgba(255, 255, 255, 0.1);
      }

      ion-menu {
        --width: 280px;
        --background: var(--dark-bg);
      }

      .logo-container {
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: var(--sidebar-bg);
        border-bottom: 1px solid var(--menu-item-border);

        img {
          height: 40px;
          width: auto;
        }
      }

      ion-content.sidebar-content {
        --background: var(--sidebar-bg);
        --padding-start: 0;
        --padding-end: 0;
      }

      ion-list {
        background: transparent;
        padding: 0;

        ion-item {
          --background: transparent;
          --background-hover: var(--menu-item-hover);
          --background-activated: var(--menu-item-active);
          --padding-start: 2rem;
          --padding-end: 2rem;
          --min-height: 56px;
          --border-color: var(--menu-item-border);

          &.selected {
            --background: var(--menu-item-active);
            --color: var(--accent-color);

            ion-icon {
              color: var(--accent-color);
            }
          }

          ion-icon {
            color: var(--text-secondary);
            margin-right: 1rem;
            font-size: 1.25rem;
          }

          ion-label {
            color: var(--text-primary);
            font-weight: 500;
          }
        }
      }

      @media (max-width: 768px) {
        ion-menu {
          --width: 260px;
        }

        .logo-container {
          padding: 1.5rem;

          img {
            height: 32px;
          }
        }

        ion-item {
          --min-height: 48px;
          --padding-start: 1.5rem;
          --padding-end: 1.5rem;
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

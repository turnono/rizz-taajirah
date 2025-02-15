import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-landing',
  template: `
    <ion-content [fullscreen]="true">
      <header class="header">
        <div class="logo-container">
          <img
            src="assets/images/logo/taajirah_logo_no_bg.png"
            alt="Taajirah Logo"
            class="logo"
          />
          <h1 class="brand">TAAJIRAH</h1>
        </div>
      </header>

      <div class="container">
        <div class="card-container">
          <ion-card
            class="project-card cyberpunk"
            (click)="navigateToProject()"
          >
            <ion-card-header>
              <ion-card-title>CALCULATED MISTAKE</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p class="description">
                A cryptic journey into the depths of calculation and
                consequence.
              </p>
              <div class="price-container">
                <div class="price">COST: ZAR 100</div>
                <div class="cta">Click to Enter_</div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      ion-content {
        --background: #ffffff;
      }

      .header {
        padding: 1rem 2rem;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        height: 40px;
        width: auto;
      }

      .brand {
        font-size: 1.5rem;
        color: #333;
        margin: 0;
        font-family: 'Arial', sans-serif;
        font-weight: 600;
      }

      .container {
        height: calc(100% - 72px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .card-container {
        max-width: 600px;
        width: 100%;
      }

      .project-card.cyberpunk {
        --background: rgba(0, 0, 0, 0.8);
        border: 1px solid var(--primary-color);
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0;
        --primary-color: #00ff00;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
        }

        ion-card-title {
          color: var(--primary-color);
          font-family: monospace;
          font-size: 1.5rem;
          text-shadow: 0 0 5px var(--primary-color);
        }

        .description {
          color: #ffffff;
          font-family: monospace;
          margin: 1rem 0;
        }

        .price-container {
          margin-top: 2rem;
          text-align: center;

          .price {
            color: var(--primary-color);
            font-family: monospace;
            font-size: 1.5rem;
            text-shadow: 0 0 5px var(--primary-color);
            margin-bottom: 1rem;
          }

          .cta {
            color: #ffffff;
            font-family: monospace;
            font-size: 1rem;
            opacity: 0.8;
            animation: blink 1s infinite;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  async navigateToProject() {
    await this.router.navigate(['/calculated-mistake'], { replaceUrl: true });
  }
}

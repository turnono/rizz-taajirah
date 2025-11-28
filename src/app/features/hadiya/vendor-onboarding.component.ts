import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-vendor-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>
          <div class="logo-container">
            <img
              src="assets/branding/taajirah-logo.jpeg"
              alt="Taajirah Logo"
              class="logo"
              loading="lazy"
            />
            <h1 class="brand">Hadiya Vendor Onboarding</h1>
          </div>
        </ion-title>
        <ion-button slot="end" fill="clear" (click)="goHome()">
          Back to Home
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="vendor-container">
        <div class="vendor-hero">
          <h1>Join Hadiya as a Vendor</h1>
          <p class="hero-subtitle">
            List your products on South Africa's AI-powered gift discovery platform
          </p>
        </div>

        <ion-card class="info-card">
          <ion-card-header>
            <ion-card-title>Why Join Hadiya?</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ul class="benefits-list">
              <li>🎯 Reach customers actively searching for gifts</li>
              <li>🤖 AI-powered product recommendations</li>
              <li>🇿🇦 Focus on South African vendors and products</li>
              <li>📈 Increase your product visibility</li>
              <li>💼 Simple onboarding process</li>
            </ul>
          </ion-card-content>
        </ion-card>

        <ion-card class="info-card">
          <ion-card-header>
            <ion-card-title>Get Started</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              We're currently onboarding vendors for Hadiya. To get started, please contact us with the following information:
            </p>
            <ul class="requirements-list">
              <li>Business name and registration details</li>
              <li>Product catalog or website</li>
              <li>Contact person and details</li>
              <li>Brief description of your products</li>
            </ul>
            <div class="cta-buttons">
              <ion-button expand="block" class="primary-btn" (click)="contactUs()">
                Contact Us to Join
              </ion-button>
              <ion-button expand="block" fill="outline" (click)="openHadiya()">
                Visit Hadiya
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      ion-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
      }

      ion-toolbar {
        --background: rgba(0, 0, 0, 0.85);
        --color: #ffffff;
        --border-style: none;
        border-bottom: 1px solid rgba(192, 125, 62, 0.35);
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.25rem 0.75rem;
      }

      .logo {
        height: 28px;
        width: auto;
      }

      .brand {
        font-size: 1.2rem;
        color: #c07d3e;
        margin: 0;
        font-weight: 600;
      }

      ion-content {
        --background: var(--tjr-charcoal);
        --color: #ffffff;
        margin-top: 64px;
      }

      .vendor-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
      }

      .vendor-hero {
        text-align: center;
        margin-bottom: 2rem;
      }

      .vendor-hero h1 {
        font-size: 2.5rem;
        color: #c07d3e;
        margin-bottom: 1rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
        color: #e0e0e0;
        margin: 0;
      }

      .info-card {
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(192, 125, 62, 0.3);
        border-radius: 12px;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(8px);
      }

      ion-card-title {
        color: #c07d3e;
        font-size: 1.5rem;
      }

      ion-card-content {
        color: #e0e0e0;
      }

      .benefits-list,
      .requirements-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
      }

      .benefits-list li,
      .requirements-list li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        line-height: 1.6;
      }

      .requirements-list li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: #c07d3e;
        font-weight: bold;
      }

      .cta-buttons {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .primary-btn {
        --background: #c07d3e;
        --color: #ffffff;
      }

      @media screen and (max-width: 768px) {
        .vendor-hero h1 {
          font-size: 2rem;
        }

        .hero-subtitle {
          font-size: 1rem;
        }

        .vendor-container {
          padding: 1.5rem 1rem;
        }
      }
    `,
  ],
})
export class VendorOnboardingComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['']);
  }

  contactUs() {
    const subject = encodeURIComponent('Hadiya Vendor Onboarding Inquiry');
    const body = encodeURIComponent(
      `Hi Taajirah Systems,\n\nI'm interested in joining Hadiya as a vendor.\n\nBusiness Details:\nBusiness Name:\nRegistration Number:\nWebsite/Social Media:\nContact Person:\nEmail:\nPhone:\n\nProduct Information:\nProduct Categories:\nBrief Description:\n\nThanks!`
    );
    window.location.href = `mailto:taajirah0@gmail.com?subject=${subject}&body=${body}`;
  }

  openHadiya() {
    window.open('https://hadiya.web.app/', '_blank', 'noopener,noreferrer');
  }
}

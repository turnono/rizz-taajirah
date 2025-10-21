import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  ModalController,
} from '@ionic/angular/standalone';
import { EmailCollectionService } from '../../core/services/email-collection.service';
import { HadiyaBusinessSignupService } from '../../core/services/hadia-business-signup.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-landing',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>
          <div class="logo-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/taajirah.appspot.com/o/taajirah_logo_no_bg.png?alt=media&token=85acb1a6-7db2-451f-8ef0-90c436c88cb2"
              alt="Taajirah Logo"
              class="logo"
              loading="lazy"
              decoding="async"
            />
            <h1 class="brand">TAAJIRAH</h1>
            <div *ngIf="isOffline" class="offline-indicator">
              <ion-badge color="warning">Offline</ion-badge>
            </div>
          </div></ion-title
        >

        <ion-buttons slot="end">
          <ion-button fill="clear" size="small" (click)="router.navigate([''])"
            >Home</ion-button
          >
          <ion-button
            fill="clear"
            size="small"
            (click)="router.navigate(['mcp'])"
            >MCP</ion-button
          >
          <ion-button
            fill="clear"
            size="small"
            (click)="navigateToBananaBoard()"
            >BananaBoard</ion-button
          >
          <ion-button fill="clear" size="small" (click)="navigateTo82ndrop()"
            >82ndrop</ion-button
          >
          <ion-button fill="clear" size="small" (click)="navigateToSubagents()"
            >Subagents</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content #content [fullscreen]="true">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Learn. Create. Innovate.</h1>
          <p class="hero-sub">
            Quranic Arabic Learning • AI Video Creation • Developer Tools
          </p>
        </div>
      </section>

      <!-- Product Cards -->
      <div class="products-section">
        <!-- Quranic Arabic Course - PRIMARY -->
        <ion-card
          class="product-card course-card"
          #courseSection
          (click)="navigateToCourse()"
          (keydown.enter)="navigateToCourse()"
          (keydown.space)="navigateToCourse()"
          tabindex="1"
        >
          <div class="accent-line course-accent"></div>
          <ion-badge class="free-badge">FREE</ion-badge>
          <div class="icon-container">
            <div class="product-icon">📚</div>
          </div>
          <ion-card-header>
            <ion-card-title>Quraanic Arabic</ion-card-title>
            <div class="sub-line">AI-Powered Learning</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Master Quranic Arabic with AI assistance. Interactive learning
              with instant feedback.
            </p>
            <div class="cta-container">
              <div class="cta">Start Learning</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- BananaBoard -->
        <ion-card
          class="product-card bananaboard-card"
          (click)="navigateToBananaBoard()"
          (keydown.enter)="navigateToBananaBoard()"
          (keydown.space)="navigateToBananaBoard()"
          tabindex="2"
        >
          <div class="accent-line video-accent"></div>
          <div class="icon-container">
            <div class="product-icon">🍌</div>
          </div>
          <ion-card-header>
            <ion-card-title>BananaBoard</ion-card-title>
            <div class="sub-line">
              Turn ideas into cinematic storyboards for veo 3.
            </div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Built with Nano-Banana, BananaBoard takes your raw concepts and
              splits them into visual storyboards and Veo3-ready scripts. A tool
              we use ourselves — now free for anyone to try.
            </p>
            <div class="cta-container">
              <div class="cta">Try Free</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- 82ndrop -->
        <ion-card
          class="product-card video-card"
          (click)="navigateTo82ndrop()"
          (keydown.enter)="navigateTo82ndrop()"
          (keydown.space)="navigateTo82ndrop()"
          tabindex="3"
        >
          <div class="accent-line video-accent"></div>
          <div class="icon-container">
            <div class="product-icon">🎬</div>
          </div>
          <ion-card-header>
            <ion-card-title>82ndrop</ion-card-title>
            <div class="sub-line">AI Video Creation</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Create viral 8-second AI videos with advanced Veo3 technology.
            </p>
            <div class="cta-container">
              <div class="cta">Create Videos</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- 7pace Timetracker MCP -->
        <ion-card
          class="product-card mcp-card"
          (click)="navigateToSmotaryMCP()"
          (keydown.enter)="navigateToSmotaryMCP()"
          (keydown.space)="navigateToSmotaryMCP()"
          tabindex="4"
        >
          <div class="accent-line mcp-accent"></div>
          <div class="icon-container">
            <div class="product-icon">⏰</div>
          </div>
          <ion-card-header>
            <ion-card-title>7pace MCP</ion-card-title>
            <div class="sub-line">Developer Tool</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              AI-powered time tracking for Azure DevOps. 87% faster than
              traditional tools.
            </p>
            <div class="cta-container">
              <div class="cta">Visit Website</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- DataCommons MCP -->
        <ion-card
          class="product-card datacommons-card"
          (click)="navigateToDataCommonsMCP()"
          (keydown.enter)="navigateToDataCommonsMCP()"
          (keydown.space)="navigateToDataCommonsMCP()"
          tabindex="5"
        >
          <div class="accent-line datacommons-accent"></div>
          <div class="icon-container">
            <div class="product-icon">📊</div>
          </div>
          <ion-card-header>
            <ion-card-title>DataCommons MCP</ion-card-title>
            <div class="sub-line">Data Analysis Tool</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Access and analyze global datasets with AI-powered insights and
              visualization tools.
            </p>
            <div class="cta-container">
              <div class="cta">Explore Data</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Claude Subagents Marketplace -->
        <ion-card
          class="product-card subagents-card"
          (click)="navigateToSubagents()"
          (keydown.enter)="navigateToSubagents()"
          (keydown.space)="navigateToSubagents()"
          tabindex="6"
        >
          <div class="accent-line subagents-accent"></div>
          <div class="icon-container">
            <div class="product-icon">🤖</div>
          </div>
          <ion-card-header>
            <ion-card-title>Subagents</ion-card-title>
            <div class="sub-line">AI Marketplace</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Discover and share 51+ specialized Claude AI agents.
            </p>
            <div class="cta-container">
              <div class="cta">Browse</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Shanal Tours -->
        <ion-card
          class="product-card tours-card"
          (click)="navigateToShanalTours()"
          (keydown.enter)="navigateToShanalTours()"
          (keydown.space)="navigateToShanalTours()"
          tabindex="7"
        >
          <div class="accent-line tours-accent"></div>
          <div class="icon-container">
            <div class="product-icon">🏝️</div>
          </div>
          <ion-card-header>
            <ion-card-title>Shanal Tours</ion-card-title>
            <div class="sub-line">Mauritius Travel Services</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              Mobile-friendly booking platform for car rentals, tours, and
              transfers in Mauritius with WhatsApp integration.
            </p>
            <div class="cta-container">
              <div class="cta">View Project</div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Hadiya - Coming Soon -->
        <ion-card
          class="product-card hadiya-card"
          (click)="openBusinessSignup()"
          (keydown.enter)="openBusinessSignup()"
          (keydown.space)="openBusinessSignup()"
          tabindex="8"
        >
          <div class="accent-line hadiya-accent"></div>
          <ion-badge class="coming-soon-badge">EARLY ACCESS</ion-badge>
          <div class="icon-container">
            <div class="product-icon">🎁</div>
          </div>
          <ion-card-header>
            <ion-card-title>Hadiya</ion-card-title>
            <div class="sub-line">AI-Powered Gift Discovery</div>
          </ion-card-header>
          <ion-card-content>
            <p class="card-description">
              AI-powered gift discovery platform that helps businesses reach
              customers during gifting moments. Generate contextual gift ideas
              and connect with local vendors.
            </p>
            <div class="business-features">
              <span class="business-tag">For Businesses</span>
              <span class="business-tag">Local Vendors</span>
            </div>
            <div class="cta-container">
              <div class="cta">Get Early Access</div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="footer-content">
          <p>&copy; 2024 TAAJIRAH. Built with Claude, Angular, and Firebase.</p>
          <div class="footer-links">
            <a (click)="router.navigate(['mcp'])">MCP Showcase</a>
            <a href="https://github.com/turnono" target="_blank">GitHub</a>
            <a href="mailto:contact@taajirah.com">Contact</a>
          </div>
        </div>
      </footer>
    </ion-content>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        --primary-color: #00ff00;
        --primary-light: rgba(0, 255, 0, 0.1);
        --primary-dark: #00cc00;
        --accent-color: #00ffff;
        --text-dark: #ffffff;
        --text-medium: #cccccc;
        --text-light: #999999;
        --cyberpunk-glow: rgba(0, 255, 0, 0.3);
      }

      .hero {
        // background: linear-gradient(
        //   135deg,
        //   rgba(0, 0, 0, 0.9),
        //   rgba(0, 20, 10, 0.85)
        // );
        text-align: center;
        padding: 1.5rem 3rem 0.5rem;
        margin-top: 72px; /* Ensure content is below fixed header */
      }

      @media screen and (max-width: 767px) {
        .hero {
          padding: 1.5rem 1rem 1.25rem 1rem;
          margin-top: 56px;
        }
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 1rem;
        line-height: 1.2;
        text-shadow: 0 0 20px var(--cyberpunk-glow);
      }

      @media screen and (max-width: 767px) {
        .hero-title {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
      }

      @media screen and (max-width: 480px) {
        .hero-title {
          font-size: 1.5rem;
        }
      }

      .hero-sub {
        font-size: 1.2rem;
        color: var(--text-medium);
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      @media screen and (max-width: 767px) {
        .hero-sub {
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
      }

      .cta-row {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      @media screen and (max-width: 480px) {
        .cta-row {
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .cta-row ion-button {
          width: 100%;
          max-width: 280px;
        }
      }

      .nav-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        flex-wrap: nowrap;
        white-space: nowrap;
        justify-content: flex-end;
        flex: 1 1 auto;
      }

      @media screen and (max-width: 767px) {
        .nav-actions {
          gap: 0.25rem;
        }

        .nav-actions ion-button {
          font-size: 0.8rem;
          --padding-start: 0.5rem;
          --padding-end: 0.5rem;
        }
      }

      @media screen and (max-width: 480px) {
        .nav-actions {
          gap: 0.25rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .nav-actions::-webkit-scrollbar {
          display: none;
        }
        .nav-actions ion-button {
          font-size: 0.72rem;
          --padding-start: 0.35rem;
          --padding-end: 0.35rem;
        }
      }

      .cta-primary {
        --background: var(--primary-color);
        --color: #000;
      }

      ion-content {
        --background: transparent;
        --color: var(--text-dark);
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
        --color: var(--text-dark);
        --border-style: none;
        border-bottom: 1px solid rgba(0, 255, 0, 0.35);
        --min-height: 64px; /* Taller to fit all nav items */
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        flex-wrap: nowrap;
      }

      @media screen and (max-width: 480px) {
        ion-toolbar {
          --min-height: 48px;
        }
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.25rem 0.75rem;
        flex: 0 0 auto;
      }

      .logo {
        height: 28px;
        width: auto;
      }

      .brand {
        font-size: 1.3rem;
        color: var(--primary-dark);
        margin: 0;
        font-family: 'Arial', sans-serif;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      @media screen and (max-width: 480px) {
        .brand {
          display: none;
        }
      }

      .content-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: calc(60px + 2rem) 2rem 2rem 2rem;
        box-sizing: border-box;
        padding-top: calc(env(safe-area-inset-top, 0px) + 60px + 2rem);
      }

      /* Center content when there's enough vertical space */
      @media screen and (min-height: 800px) {
        .content-container {
          justify-content: center;
          padding-top: calc(env(safe-area-inset-top, 0px) + 60px + 1rem);
        }
      }

      .intro-section {
        text-align: center;
        margin-bottom: 1.5rem;
        max-width: 500px;
      }

      .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 1rem;
        line-height: 1.2;
        text-shadow: 0 0 20px var(--cyberpunk-glow);
        font-family: 'Arial', monospace;
        letter-spacing: 2px;
      }

      .section-subtitle {
        font-size: 1.1rem;
        color: var(--text-medium);
        margin: 0;
        line-height: 1.6;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      }

      .products-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        max-width: 1200px;
        width: 100%;
        margin: 0.5rem auto;
        padding: 0 1.5rem;
        align-items: stretch;
      }

      @media screen and (min-width: 768px) {
        .products-section {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
      }

      @media screen and (min-width: 1024px) {
        .products-section {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
      }

      @media screen and (max-width: 767px) {
        .products-section {
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin: 2rem auto;
          padding: 0 1rem;
        }
      }

      @media screen and (max-width: 480px) {
        .products-section {
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 1.5rem auto;
          padding: 0 0.5rem;
        }
      }

      /* Product card styles */
      .product-card {
        background: rgba(0, 0, 0, 0.85);
        border: 1px solid rgba(0, 255, 0, 0.3);
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 255, 0, 0.12);
        backdrop-filter: blur(12px);
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        height: 100%;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        color: var(--text-dark);
      }

      @media screen and (max-width: 767px) {
        .product-card {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 255, 0, 0.1);
        }

        .product-card ion-card-header {
          padding: 1rem 1rem 0.5rem 1rem;
        }

        .product-card ion-card-content {
          padding: 0.5rem 1rem 1rem 1rem;
        }

        .product-card ion-card-title {
          font-size: 1.1rem;
        }

        .sub-line {
          font-size: 0.8rem;
        }

        .cta-container {
          margin-top: 1rem;
          padding-top: 0.75rem;
        }

        .cta {
          font-size: 1rem;
        }
      }

      .product-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(0, 255, 0, 0.2);
        border-color: rgba(0, 255, 0, 0.5);
      }

      @media screen and (max-width: 767px) {
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 255, 0, 0.2);
        }
      }

      .mcp-card {
        border-color: rgba(54, 255, 159, 0.4);
        box-shadow: 0 8px 24px rgba(54, 255, 159, 0.12);
      }

      .mcp-card:hover {
        border-color: rgba(54, 255, 159, 0.6);
        box-shadow: 0 16px 40px rgba(54, 255, 159, 0.2);
      }

      .video-card {
        border-color: rgba(0, 149, 255, 0.4);
        box-shadow: 0 8px 24px rgba(0, 149, 255, 0.12);
      }

      .video-card:hover {
        border-color: rgba(0, 149, 255, 0.6);
        box-shadow: 0 16px 40px rgba(0, 149, 255, 0.2);
      }

      .subagents-card {
        border-color: rgba(255, 107, 53, 0.4);
        box-shadow: 0 8px 24px rgba(255, 107, 53, 0.12);
      }

      .subagents-card:hover {
        border-color: rgba(255, 107, 53, 0.6);
        box-shadow: 0 16px 40px rgba(255, 107, 53, 0.2);
      }

      .tours-card {
        border-color: rgba(0, 212, 170, 0.4);
        box-shadow: 0 8px 24px rgba(0, 212, 170, 0.12);
      }

      .tours-card:hover {
        border-color: rgba(0, 212, 170, 0.6);
        box-shadow: 0 16px 40px rgba(0, 212, 170, 0.2);
      }

      .datacommons-card {
        border-color: rgba(138, 43, 226, 0.4);
        box-shadow: 0 8px 24px rgba(138, 43, 226, 0.12);
      }

      .datacommons-card:hover {
        border-color: rgba(138, 43, 226, 0.6);
        box-shadow: 0 16px 40px rgba(138, 43, 226, 0.2);
      }

      .hadiya-card {
        border-color: rgba(255, 107, 157, 0.4);
        box-shadow: 0 8px 24px rgba(255, 107, 157, 0.12);
      }

      .hadiya-card:hover {
        border-color: rgba(255, 107, 157, 0.6);
        box-shadow: 0 16px 40px rgba(255, 107, 157, 0.2);
      }

      .accent-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), #36ff9f);
      }

      .mcp-accent {
        background: linear-gradient(90deg, #36ff9f, #00d4ff);
      }

      .course-accent {
        background: linear-gradient(90deg, var(--primary-color), #7ed321);
      }

      .video-accent {
        background: linear-gradient(90deg, #0095ff, #9013fe);
      }

      .subagents-accent {
        background: linear-gradient(90deg, #ff6b35, #ff8c42);
      }

      .tours-accent {
        background: linear-gradient(90deg, #00d4aa, #00b894);
      }

      .datacommons-accent {
        background: linear-gradient(90deg, #8a2be2, #9370db);
      }

      .hadiya-accent {
        background: linear-gradient(90deg, #ff6b9d, #ff8e9b);
      }

      .product-card ion-card-content {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
      }

      .cta-container {
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 255, 157, 0.2);
        margin-top: auto;
      }

      .cta {
        color: #36ff9f;
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 0 5px rgba(54, 255, 159, 0.3);
      }

      @media (prefers-reduced-motion: reduce) {
        .product-card:hover {
          transform: none;
          box-shadow: 0 8px 24px rgba(0, 255, 0, 0.12);
        }
        .cta {
          animation: none !important;
        }
      }

      .icon-container {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 3;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        padding: 0.5rem;
        backdrop-filter: blur(5px);
      }

      .product-icon {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
      }

      .card-description {
        color: var(--text-medium);
        font-size: 0.9rem;
        line-height: 1.4;
        margin-bottom: 1rem;
        opacity: 0.9;
      }

      @media screen and (max-width: 767px) {
        .icon-container {
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.4rem;
        }

        .product-icon {
          font-size: 1.2rem;
          width: 1.5rem;
          height: 1.5rem;
        }

        .card-description {
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }
      }

      .sub-line {
        color: var(--text-medium);
        font-size: 0.9rem;
        opacity: 0.8;
      }

      .description {
        color: var(--text-medium);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      /* Footer styles */
      .site-footer {
        background: rgba(0, 0, 0, 0.95);
        border-top: 1px solid rgba(0, 255, 0, 0.3);
        padding: 2rem 0;
        margin-top: 4rem;
        text-align: center;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .footer-content p {
        color: var(--text-medium);
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
      }

      .footer-links a {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
        cursor: pointer;
      }

      .footer-links a:hover {
        color: #36ff9f;
        text-shadow: 0 0 5px rgba(54, 255, 159, 0.3);
      }

      /* Course card extends product-card */
      .course-card {
        border-color: var(--primary-color);
      }

      .course-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 255, 0, 0.4);
        border-color: var(--accent-color);
      }

      .image-container {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1a4d3a, #0f2419);
      }

      @media screen and (max-width: 767px) {
        .image-container {
          height: 150px;
        }
      }

      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          var(--primary-color) 0%,
          var(--primary-dark) 100%
        );
        z-index: 1;
        opacity: 0.9;
      }

      .card-overlay-text {
        position: absolute;
        bottom: 20px;
        left: 20px;
        z-index: 3;
      }

      .card-overlay-text h2 {
        color: white;
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        letter-spacing: 0.5px;
      }

      .free-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        --background: var(--primary-color);
        --color: #000;
        font-weight: 600;
        z-index: 2;
      }

      .coming-soon-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        --background: #ff6b9d;
        --color: #fff;
        font-weight: 600;
        z-index: 2;
        font-size: 0.7rem;
        padding: 0.3rem 0.6rem;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
      }

      .business-features {
        display: flex;
        gap: 0.5rem;
        margin: 0.75rem 0;
        flex-wrap: wrap;
      }

      .business-tag {
        background: rgba(255, 107, 157, 0.15);
        color: #ff6b9d;
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        font-size: 0.7rem;
        font-weight: 500;
        border: 1px solid rgba(255, 107, 157, 0.3);
      }

      .signup-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .signup-header h2 {
        color: var(--primary-color);
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        text-shadow: 0 0 10px var(--cyberpunk-glow);
      }

      .signup-header p {
        color: var(--text-medium);
        font-size: 1rem;
      }

      .business-form {
        margin-bottom: 2rem;
      }

      .business-form ion-item {
        --background: rgba(0, 0, 0, 0.3);
        --border-color: rgba(255, 107, 157, 0.3);
        --color: var(--text-dark);
        margin-bottom: 1rem;
        border-radius: 8px;
      }

      .business-form ion-item.ion-focused {
        --border-color: #ff6b9d;
        --border-width: 2px;
      }

      .business-form ion-label {
        color: var(--text-medium);
        font-weight: 500;
      }

      .business-form ion-input,
      .business-form ion-textarea,
      .business-form ion-select {
        --color: var(--text-dark);
      }

      .form-actions {
        margin-top: 1.5rem;
      }

      .submit-button {
        --background: linear-gradient(45deg, #ff6b9d, #ff8e9b);
        --color: #fff;
        --border-radius: 8px;
        font-weight: 600;
        height: 48px;
      }

      .submit-button:hover:not([disabled]) {
        --background: linear-gradient(45deg, #ff5a8a, #ff7d8a);
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
      }

      .signup-message {
        margin-top: 1rem;
        padding: 0.75rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
      }

      .signup-message.success {
        background: rgba(0, 255, 0, 0.1);
        color: var(--primary-color);
        border: 1px solid rgba(0, 255, 0, 0.3);
      }

      .signup-message.error {
        background: rgba(255, 68, 68, 0.1);
        color: #ff4444;
        border: 1px solid rgba(255, 68, 68, 0.3);
      }

      .benefits-section {
        background: rgba(255, 107, 157, 0.05);
        border: 1px solid rgba(255, 107, 157, 0.2);
        border-radius: 12px;
        padding: 1.5rem;
        margin-top: 2rem;
      }

      .benefits-section h3 {
        color: #ff6b9d;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        text-align: center;
      }

      .benefits-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .benefits-section li {
        color: var(--text-medium);
        margin-bottom: 0.75rem;
        padding-left: 0;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      @media screen and (max-width: 767px) {
        .signup-container {
          padding: 1rem;
        }

        .signup-header h2 {
          font-size: 1.5rem;
        }

        .benefits-section {
          padding: 1rem;
        }
      }

      .course-icon {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        padding: 0.5rem;
        backdrop-filter: blur(5px);
        font-size: 1.5rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }

      @media screen and (max-width: 767px) {
        .free-badge {
          top: 0.75rem;
          right: 0.75rem;
          font-size: 0.8rem;
        }

        .course-icon {
          top: 0.75rem;
          left: 0.75rem;
          padding: 0.4rem;
          font-size: 1.2rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      ion-card-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 0.3rem;
      }

      .sub-line {
        color: var(--text-medium);
        font-size: 0.8rem;
        margin-bottom: 0.8rem;
      }

      .micro-blurb {
        font-size: 0.85rem;
        color: var(--text-medium);
        margin-bottom: 0.8rem;
        line-height: 1.4;
      }

      .features-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 1rem;
      }

      .feature {
        background: rgba(0, 255, 0, 0.1);
        color: var(--primary-color);
        padding: 0.3rem 0.6rem;
        border-radius: 8px;
        font-size: 0.7rem;
        font-weight: 500;
        border: 1px solid rgba(0, 255, 0, 0.3);
        font-family: 'Courier New', monospace;
        text-shadow: 0 0 5px var(--cyberpunk-glow);
        transition: all 0.3s ease;
      }

      .feature:hover {
        background: rgba(0, 255, 0, 0.2);
        border-color: var(--primary-color);
        transform: scale(1.05);
      }

      .cta-button {
        --background: var(--primary-color);
        --color: #000;
        font-weight: 600;
        margin-top: 1rem;
      }

      @media screen and (max-width: 767px) {
        .cta-button {
          margin-top: 0.75rem;
          min-height: 44px;
        }
      }

      .cta-button:hover:not([disabled]) {
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.6);
        transform: translateY(-2px);
      }

      .cta-button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .cta-button:active:not([disabled]) {
        transform: translateY(0);
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
      }

      .cta-button:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
      }

      /* Touch feedback for cards */
      .project-card:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }

      .feature:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
      }

      /* Focus management styles */
      .project-card:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.2);
      }

      ion-input:focus-within {
        --border-width: 2px;
        --border-color: var(--accent-color);
      }

      /* Skip link for accessibility */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: #000;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
      }

      .skip-link:focus {
        top: 6px;
      }

      /* Project card styles */
      .project-card {
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        margin-bottom: 1.5rem;
      }

      .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      /* Modern theme adapted for cyberpunk */
      .modern {
        background: rgba(0, 20, 40, 0.9);
        border: 2px solid var(--accent-color);
        color: var(--text-dark);
        backdrop-filter: blur(10px);
      }

      .modern:hover {
        border-color: var(--primary-color);
        box-shadow: 0 6px 20px rgba(0, 255, 255, 0.3);
        transform: translateY(-3px);
      }

      .modern ion-card-title {
        color: var(--accent-color);
        font-weight: 700;
        font-size: 1.2rem;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      }

      .modern-sub {
        color: var(--text-medium) !important;
        font-weight: 500;
        font-size: 0.9rem !important;
      }

      .modern .description {
        color: var(--text-medium);
        margin-bottom: 1.5rem;
      }

      .tech-specs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 1rem;
      }

      .spec {
        background: rgba(0, 255, 255, 0.1);
        color: var(--accent-color);
        padding: 0.3rem 0.6rem;
        border-radius: 8px;
        font-size: 0.7rem;
        font-weight: 500;
        border: 1px solid rgba(0, 255, 255, 0.3);
        font-family: 'Courier New', monospace;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .spec:hover {
        background: rgba(0, 255, 255, 0.2);
        border-color: var(--accent-color);
        transform: scale(1.05);
      }

      .spec-icon {
        width: 14px;
        height: 14px;
        opacity: 0.9;
      }

      .modern-price {
        border-top: 1px solid rgba(0, 255, 255, 0.3);
        padding-top: 1rem;
        text-align: center;
      }

      .modern-cta {
        color: var(--accent-color);
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
      }

      .modern-accent {
        background: linear-gradient(
          90deg,
          var(--accent-color),
          transparent
        ) !important;
      }

      /* MCP theme */
      .mcp {
        background: rgba(10, 28, 10, 0.9);
        border: 2px solid #36ff9f;
        color: var(--text-dark);
        backdrop-filter: blur(10px);
      }

      .mcp:hover {
        border-color: #00ff9d;
        box-shadow: 0 6px 20px rgba(0, 255, 157, 0.3);
        transform: translateY(-3px);
      }

      .mcp ion-card-title {
        color: #36ff9f;
        font-weight: 700;
        font-size: 1.2rem;
        text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
      }

      .mcp-sub {
        color: var(--text-medium) !important;
        font-weight: 500;
        font-size: 0.9rem !important;
      }

      .mcp .description {
        color: var(--text-medium);
        margin-bottom: 1.5rem;
      }

      .mcp .spec {
        background: rgba(0, 255, 157, 0.08);
        color: #36ff9f;
        border: 1px solid rgba(0, 255, 157, 0.3);
        text-shadow: 0 0 5px rgba(0, 255, 157, 0.25);
      }

      .mcp .spec:hover {
        background: rgba(0, 255, 157, 0.15);
        border-color: #36ff9f;
        transform: scale(1.05);
      }

      .mcp-price {
        border-top: 1px solid rgba(0, 255, 157, 0.3);
        padding-top: 1rem;
        text-align: center;
      }

      .mcp-cta {
        color: #36ff9f;
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 0 5px rgba(54, 255, 159, 0.3);
        animation: pulse 2s infinite;
      }

      .local-link {
        margin-top: 0.75rem;
        text-align: center;
      }

      .local-link a {
        color: #36ff9f;
        text-decoration: underline;
        cursor: pointer;
      }

      @keyframes pulse {
        0%,
        100% {
          text-shadow: 0 0 5px rgba(54, 255, 159, 0.3);
        }
        50% {
          text-shadow: 0 0 15px rgba(54, 255, 159, 0.6);
        }
      }

      /* Boot sequence styles */
      .initial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--cyberpunk-bg);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 1s ease;

        &.fade-out {
          opacity: 0;
          pointer-events: none;
        }
      }

      .boot-sequence {
        font-family: 'Courier New', monospace;
        color: var(--primary-color);
        text-align: left;
        max-width: 90%;
        padding: 0 1rem;

        .line {
          opacity: 0;
          transform: translateX(-20px);
          animation: typeIn 0.5s ease forwards;
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
          word-break: break-word;

          &.visible {
            opacity: 1;
            transform: translateX(0);
          }

          &::before {
            content: '>';
            margin-right: 0.5rem;
            color: var(--accent-color);
          }
        }

        .instruction {
          margin-top: 2rem;
          color: var(--accent-color);
          animation: blink 1s infinite;
          font-weight: bold;
          text-align: center;
        }
      }

      /* Mobile optimizations */
      @media screen and (max-width: 768px) {
        .boot-sequence {
          max-width: 95%;
          padding: 0 0.5rem;

          .line {
            font-size: 0.9rem;
            margin-bottom: 0.6rem;
          }

          .instruction {
            margin-top: 1.5rem;
            font-size: 0.9rem;
          }
        }

        .countdown-container {
          margin-top: 1rem;
          padding: 0.8rem;
        }

        .countdown {
          font-size: 1.2rem;
          letter-spacing: 1px;
        }

        .countdown-label {
          font-size: 0.8rem;
        }
      }

      @media screen and (max-width: 480px) {
        .content-container {
          padding: calc(env(safe-area-inset-top, 0px) + 60px + 0.5rem) 0.5rem
            0.5rem 0.5rem;
        }

        .section-title {
          font-size: 1.8rem;
        }

        .section-subtitle {
          font-size: 1rem;
        }

        .intro-section {
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        }

        .boot-sequence {
          .line {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
          }

          .instruction {
            font-size: 0.8rem;
          }
        }

        .countdown {
          font-size: 1rem;
        }

        .logo-container {
          padding: 0.3rem;
        }

        .brand {
          font-size: 1.2rem;
        }

        .logo {
          height: 30px;
        }
      }

      /* Removed unused animations */

      /* Countdown/Uptime styles */
      .countdown-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.5rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        backdrop-filter: blur(10px);
      }

      .countdown-label {
        font-family: 'Courier New', monospace;
        color: var(--text-medium);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
      }

      .countdown {
        font-family: 'Courier New', monospace;
        color: var(--primary-color);
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 0 0 10px var(--cyberpunk-glow);
        letter-spacing: 2px;
      }

      /* Email form styles */
      .email-field {
        margin-bottom: 1.5rem;
      }

      @media screen and (max-width: 767px) {
        .email-field {
          margin-bottom: 1rem;
        }
      }

      .error-message {
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: block;
      }

      /* Email validation styles */
      ion-input.valid-email {
        --border-color: var(--primary-color);
        --color: var(--text-dark);
      }

      ion-input.invalid-email {
        --border-color: #ff4444;
        --color: var(--text-dark);
      }

      ion-input.valid-email::part(native) {
        box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
      }

      ion-input.invalid-email::part(native) {
        box-shadow: 0 0 5px rgba(255, 68, 68, 0.3);
      }

      /* Touch-friendly input behavior */
      ion-input {
        --padding-top: 12px;
        --padding-bottom: 12px;
        cursor: pointer;
      }

      ion-input:focus-within {
        --border-width: 2px;
        --border-color: var(--accent-color);
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        gap: 1.5rem;
      }

      .loading-skeleton {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 300px;
        opacity: 0.3;
      }

      .skeleton-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 0, 0.1) 25%,
          rgba(0, 255, 0, 0.3) 50%,
          rgba(0, 255, 0, 0.1) 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
      }

      .skeleton-lines {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .skeleton-line {
        height: 12px;
        border-radius: 6px;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 0, 0.1) 25%,
          rgba(0, 255, 0, 0.3) 50%,
          rgba(0, 255, 0, 0.1) 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
      }

      .skeleton-line.long {
        width: 100%;
      }
      .skeleton-line.medium {
        width: 75%;
      }
      .skeleton-line.short {
        width: 50%;
      }

      @keyframes skeleton-loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .loading-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .ai-spinner {
        --color: var(--primary-color);
        transform: scale(1.2);
      }

      .loading-message {
        color: var(--text-medium);
        margin: 0;
        font-size: 0.95rem;
        font-weight: 500;
      }

      .loading-progress {
        width: 200px;
        height: 4px;
        background: rgba(0, 255, 0, 0.2);
        border-radius: 2px;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--accent-color)
        );
        border-radius: 2px;
        transition: width 0.8s ease;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }

      .button-spinner {
        margin-right: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonBadge,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
  ],
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('content') content!: IonContent;
  @ViewChild('emailInput') emailInput!: any;
  @ViewChild('courseSection') courseSection!: ElementRef;

  emailForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  hasEmail = false;
  userId = '';
  isValidEmail = false;

  // Business signup properties
  isBusinessSignupOpen = false;
  businessSignupForm: FormGroup;
  isSubmittingBusiness = false;
  businessSignupMessage = '';
  businessSignupSuccess = false;

  // Connection status
  isOffline = false;

  constructor(
    public router: Router,
    private emailService: EmailCollectionService,
    private hadiyaBusinessService: HadiyaBusinessSignupService,
    private fb: FormBuilder,
    private analytics: AnalyticsService,
    private seo: SeoService,
    private modalCtrl: ModalController
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.businessSignupForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      businessType: [''],
      location: [''],
      description: [''],
    });
  }

  async ngOnInit() {
    // Simple, fast initialization - no loading delays
    try {
      // Subscribe to user changes (non-blocking)
      this.emailService.currentUser$.subscribe((user: any) => {
        this.hasEmail = !!user?.email;
        this.analytics.trackEvent(
          'user_visit',
          'user_journey',
          this.hasEmail ? 'returning_user' : 'new_user'
        );
      });
    } catch (error: any) {
      console.error('User init error:', error);
      // Don't block the UI for analytics errors
    }
  }

  ngAfterViewInit() {
    // Immediate view initialization - no delays
    if (this.content) {
      this.content.scrollToTop(0);
    }

    // Defer non-critical analytics to idle time to avoid holding the load spinner
    const defer = (fn: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(fn)
        : setTimeout(fn, 0);

    defer(() => this.trackPerformanceMetrics());
  }

  // Track performance metrics for optimization
  private trackPerformanceMetrics() {
    // Track device information
    this.analytics.trackDevicePerformance();

    // Track network performance
    this.analytics.trackNetworkPerformance();

    // Track connection status
    this.analytics.trackConnectionStatus();
    this.setupOfflineHandling();

    // Track Core Web Vitals
    this.analytics.trackWebVitals();

    // Track resource loading performance immediately
    this.analytics.trackResourcePerformance();

    // Track component initialization time
    const componentLoadTime = performance.now();
    this.analytics.trackPerformance(
      'component_load_time',
      Math.round(componentLoadTime),
      'ms'
    );
  }

  async submitEmail() {
    if (this.emailForm.valid && !this.isSubmitting) {
      const startTime = performance.now();
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const { email } = this.emailForm.value;

        // Track email submission attempt
        this.analytics.trackEvent(
          'email_submit_attempt',
          'conversion',
          'quranic_course'
        );

        // Ensure anonymous user exists before updating with email
        if (!this.userId) {
          this.userId = await this.emailService.createAnonymousUserIfNeeded();
        }
        await this.emailService.updateUserWithEmail(this.userId, email);

        // Track successful conversion
        this.analytics.trackConversion('email_signup', {
          course_name: 'Quranic Arabic Course',
          user_id: this.userId,
          email_domain: email.split('@')[1],
        });

        // Track course enrollment
        this.analytics.trackCourseEvent(
          'course_enrollment',
          'Quranic Arabic Course',
          0
        );

        // Track AI interaction
        this.analytics.trackAIInteraction('course_signup', 'email_conversion', {
          ai_feature: 'study_assistant',
          course_type: 'quranic_arabic',
        });

        // Track interaction performance
        this.analytics.trackInteractionPerformance(
          'email_submission',
          startTime
        );

        // Navigate to notebook
        this.navigateToNotebook();
      } catch (error: any) {
        console.error('Error submitting email:', error);

        // Track detailed error information
        this.analytics.trackError(error, 'email_submission', {
          form_name: 'email_signup',
          user_id: this.userId,
          email_domain: this.emailForm.value.email?.split('@')[1],
        });

        this.analytics.trackEvent(
          'error',
          'conversion',
          'email_submission_failed'
        );
        this.errorMessage =
          error.message || 'Error processing your email. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  navigateToNotebook() {
    // Track course start
    this.analytics.trackCourseEvent('course_start', 'Quranic Arabic Course', 0);
    this.analytics.trackMilestone('course_access_granted', {
      user_id: this.userId,
      course_name: 'Quranic Arabic Course',
    });

    // Get notebook URL from service
    const notebookUrl = this.emailService.getNotebookUrl();

    // Track external navigation
    this.analytics.trackExternalClick(notebookUrl, 'Start Course Button');

    // Redirect to the notebook
    window.location.href = notebookUrl;
  }

  navigateTo82ndrop() {
    const startTime = performance.now();

    // Track 82ndrop interaction
    this.analytics.trackVideoEvent('platform_visit', {
      source: 'taajirah_landing',
      user_type: this.hasEmail ? 'registered' : 'anonymous',
    });

    // Track interaction performance
    this.analytics.trackInteractionPerformance('82ndrop_navigation', startTime);

    // Track AI platform interaction
    this.analytics.trackAIInteraction('video_creation', 'platform_navigation', {
      ai_feature: 'veo3_videos',
      destination: '82ndrop',
    });

    // Track external click
    this.analytics.trackExternalClick(
      'https://82ndrop.web.app/',
      '82ndrop Card'
    );

    window.open('https://82ndrop.web.app/', '_blank', 'noopener,noreferrer');
  }

  navigateToBananaBoard() {
    const url = 'https://tjr-veo.web.app';
    const startTime = performance.now();

    this.analytics.trackEvent('platform_visit', 'navigation', 'bananaboard');
    this.analytics.trackInteractionPerformance(
      'bananaboard_navigation',
      startTime
    );
    this.analytics.trackAIInteraction('video', 'platform_navigation', {
      ai_feature: 'bananaboard',
      destination: 'tjr_veo',
    });
    this.analytics.trackExternalClick(url, 'BananaBoard Card');
    window.open(url, '_blank', 'noopener');
  }

  navigateToSmotaryMCP() {
    // External link to Smithery MCP page
    const url = 'https://smithery.ai/server/@turnono/sevenpace-mcp-server';
    const startTime = performance.now();

    // Track MCP interaction
    this.analytics.trackEvent('platform_visit', 'navigation', 'smithery_mcp');
    this.analytics.trackInteractionPerformance(
      'smithery_navigation',
      startTime
    );
    this.analytics.trackAIInteraction('mcp', 'platform_navigation', {
      ai_feature: 'sevenpace_mcp',
      destination: 'smithery_ai',
    });
    this.analytics.trackExternalClick(url, 'Smithery MCP Card');
    window.open(url, '_blank', 'noopener');
  }

  navigateToDataCommonsMCP() {
    // External link to DataCommons MCP page
    const url = 'https://smithery.ai/server/@turnono/datacommons-mcp-server';
    const startTime = performance.now();

    // Track MCP interaction
    this.analytics.trackEvent(
      'platform_visit',
      'navigation',
      'datacommons_mcp'
    );
    this.analytics.trackInteractionPerformance(
      'datacommons_navigation',
      startTime
    );
    this.analytics.trackAIInteraction('mcp', 'platform_navigation', {
      ai_feature: 'datacommons_mcp',
      destination: 'smithery_ai',
    });
    this.analytics.trackExternalClick(url, 'DataCommons MCP Card');
    window.open(url, '_blank', 'noopener');
  }

  navigateToMcpShowcase() {
    this.analytics.trackEvent('internal_nav', 'navigation', 'mcp_showcase');
  }

  navigateToCourse() {
    const startTime = performance.now();
    const notebookUrl =
      'https://notebooklm.google.com/notebook/1d9d16c6-a52c-4fb3-a7ac-26e14606b3ad';

    // Track course interest
    this.analytics.trackEvent(
      'course_interest',
      'navigation',
      'quranic_arabic'
    );

    // Track interaction performance
    this.analytics.trackInteractionPerformance(
      'quranic_arabic_navigation',
      startTime
    );

    // Track external click to NotebookLM
    this.analytics.trackExternalClick(
      notebookUrl,
      'Quranic Arabic Course - NotebookLM'
    );

    // Track AI learning interaction
    this.analytics.trackAIInteraction(
      'quranic_arabic_learning',
      'notebooklm_navigation',
      {
        ai_feature: 'notebooklm',
        destination: 'quranic_arabic_course',
        learning_platform: 'google_notebooklm',
      }
    );

    // Open the NotebookLM notebook
    window.open(notebookUrl, '_blank', 'noopener,noreferrer');
  }

  navigateToSubagents() {
    const startTime = performance.now();

    // Track Subagents interaction
    this.analytics.trackEvent(
      'platform_visit',
      'navigation',
      'claude_subagents'
    );

    // Track interaction performance
    this.analytics.trackInteractionPerformance(
      'subagents_navigation',
      startTime
    );

    // Track AI platform interaction
    this.analytics.trackAIInteraction(
      'agents_marketplace',
      'platform_navigation',
      {
        ai_feature: 'claude_agents',
        destination: 'subagents_marketplace',
      }
    );

    // Track external click
    this.analytics.trackExternalClick(
      'https://subagents.web.app/',
      'Claude Subagents Card'
    );

    window.open('https://subagents.web.app/', '_blank', 'noopener,noreferrer');
  }

  navigateToShanalTours() {
    const startTime = performance.now();

    // Track Shanal Tours interaction
    this.analytics.trackEvent('project_visit', 'navigation', 'shanal_tours');

    // Track interaction performance
    this.analytics.trackInteractionPerformance(
      'shanal_tours_navigation',
      startTime
    );

    // Track project showcase interaction
    this.analytics.trackEvent(
      'project_showcase',
      'travel_platform',
      'mauritius_tours'
    );

    // Track external click
    this.analytics.trackExternalClick(
      'https://shanal.web.app/',
      'Shanal Tours Card'
    );

    window.open('https://shanal.web.app/', '_blank', 'noopener,noreferrer');
  }

  navigateToHadiya() {
    const startTime = performance.now();

    // Track Hadiya interaction
    this.analytics.trackEvent(
      'project_visit',
      'navigation',
      'hadiya_coming_soon'
    );

    // Track interaction performance
    this.analytics.trackInteractionPerformance('hadiya_navigation', startTime);

    // Track project showcase interaction
    this.analytics.trackEvent(
      'project_showcase',
      'ai_gift_discovery',
      'coming_soon'
    );

    // Track external click
    this.analytics.trackExternalClick(
      'https://hadiya.web.app/',
      'Hadiya Coming Soon Card'
    );

    window.open('https://hadiya.web.app/', '_blank', 'noopener,noreferrer');
  }

  async openBusinessSignup() {
    try {
      console.log('🚀 Opening business signup modal...');

      // Track business signup modal open
      this.analytics.trackEvent(
        'business_signup',
        'modal_open',
        'hadiya_early_access'
      );

      // Import the modal component
      const { BusinessSignupModalComponent } = await import(
        './business-signup-modal.component'
      );

      console.log(
        '✅ BusinessSignupModalComponent loaded:',
        BusinessSignupModalComponent
      );

      // Create and present the modal
      const modal = await this.modalCtrl.create({
        component: BusinessSignupModalComponent,
        cssClass: 'cyberpunk-modal',
        backdropDismiss: true,
        showBackdrop: true,
      });

      console.log('✅ Modal created, presenting...');

      // Handle form submission
      modal.onDidDismiss().then((result) => {
        console.log('📝 Modal dismissed with result:', result);
        if (result.data && result.data.formData) {
          console.log('📊 Form data received:', result.data.formData);
          this.handleBusinessSignup(result.data.formData);
        }
      });

      const result = await modal.present();
      console.log('✅ Modal presented successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error opening business signup modal:', error);
      this.analytics.trackEvent(
        'business_signup',
        'modal_error',
        'hadiya_early_access'
      );
    }
  }

  async handleBusinessSignup(formData: any) {
    try {
      console.log('💾 Processing business signup with data:', formData);

      // Track form submission
      this.analytics.trackEvent(
        'business_signup',
        'form_submit',
        'hadiya_early_access'
      );

      console.log('🔥 Saving to Hadiya Firebase project (tjr-gift)...');

      // Save to Hadiya Firebase project
      const signupId = await this.hadiyaBusinessService.submitBusinessSignup({
        businessName: formData.businessName,
        email: formData.email,
        businessType: formData.businessType,
        location: formData.location,
        description: formData.description,
      });

      // Track success
      this.analytics.trackEvent(
        'business_signup',
        'success',
        'hadiya_early_access'
      );

      console.log(
        '✅ Business signup saved to Hadiya project with ID:',
        signupId
      );
    } catch (error) {
      console.error('❌ Error saving business signup:', error);
      this.analytics.trackEvent(
        'business_signup',
        'error',
        'hadiya_early_access'
      );
    }
  }

  closeBusinessSignup() {
    this.isBusinessSignupOpen = false;
    this.businessSignupForm.reset();
    this.businessSignupMessage = '';
    this.businessSignupSuccess = false;
  }

  async submitBusinessSignup() {
    if (this.businessSignupForm.invalid) {
      this.businessSignupMessage = 'Please fill in all required fields.';
      this.businessSignupSuccess = false;
      return;
    }

    this.isSubmittingBusiness = true;
    this.businessSignupMessage = '';

    try {
      const formData = this.businessSignupForm.value;

      // Track business signup attempt
      this.analytics.trackEvent(
        'business_signup',
        'form_submit',
        'hadiya_early_access'
      );

      // Track business type for analytics
      if (formData.businessType) {
        this.analytics.trackEvent(
          'business_signup',
          'business_type',
          formData.businessType
        );
      }

      // Save to Hadiya Firebase project
      const signupId = await this.hadiyaBusinessService.submitBusinessSignup({
        businessName: formData.businessName,
        email: formData.email,
        businessType: formData.businessType,
        location: formData.location,
        description: formData.description,
      });

      console.log('Business signup saved to Hadiya project with ID:', signupId);

      this.businessSignupSuccess = true;
      this.businessSignupMessage =
        "Thank you! We'll be in touch soon with early access details.";

      // Track successful signup
      this.analytics.trackEvent(
        'business_signup',
        'success',
        'hadiya_early_access'
      );

      // Reset form after success
      setTimeout(() => {
        this.closeBusinessSignup();
      }, 3000);
    } catch (error) {
      console.error('Business signup error:', error);
      this.businessSignupSuccess = false;
      this.businessSignupMessage = 'Something went wrong. Please try again.';

      // Track signup error
      this.analytics.trackEvent(
        'business_signup',
        'error',
        'hadiya_early_access'
      );
    } finally {
      this.isSubmittingBusiness = false;
    }
  }

  clearError() {
    this.errorMessage = '';
    this.analytics.trackEvent('error_cleared', 'user_action', 'retry_attempt');
  }

  onEmailInput() {
    const email = this.emailForm.get('email')?.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = emailRegex.test(email);

    // Track form validation errors
    if (email && email.length > 0 && !this.isValidEmail) {
      this.analytics.trackFormError('email_signup', 'email', 'invalid_format');
    }

    if (this.isValidEmail) {
      this.analytics.trackEvent(
        'valid_email_entered',
        'form_interaction',
        'email_validation'
      );
    }
  }

  focusEmailInput() {
    if (this.emailInput && this.emailInput.setFocus) {
      this.emailInput.setFocus();
      this.analytics.trackEvent(
        'email_input_focused',
        'user_interaction',
        'auto_focus'
      );
    }
  }

  scrollToCourse() {
    try {
      const el = this.courseSection?.nativeElement as HTMLElement;
      if (el && this.content) {
        this.content.scrollToPoint(0, el.offsetTop - 80, 500);
      }
    } catch {}
  }

  // Helper method to detect device type
  private getDeviceType(): string {
    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

    return isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  }

  // Removed loading sequence - instant load now

  // Handle offline/online status
  private setupOfflineHandling() {
    this.isOffline = !navigator.onLine;

    window.addEventListener('online', () => {
      this.isOffline = false;
    });

    window.addEventListener('offline', () => {
      this.isOffline = true;
    });
  }
}

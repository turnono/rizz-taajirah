import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  IonInput,
  IonText,
  IonSpinner,
} from '@ionic/angular/standalone';
import { EmailCollectionService } from '../../core/services/email-collection.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-landing',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="logo-container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/taajirah.appspot.com/o/taajirah_logo_no_bg.png?alt=media&token=85acb1a6-7db2-451f-8ef0-90c436c88cb2"
            alt="Taajirah Logo"
            class="logo"
            loading="eager"
          />
          <h1 class="brand">TAAJIRAH</h1>
          <div *ngIf="isOffline" class="offline-indicator">
            <ion-badge color="warning">Offline</ion-badge>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content #content [fullscreen]="true">
      <!-- Boot sequence overlay -->
      <div class="initial-overlay" [class.fade-out]="bootComplete">
        <div class="boot-sequence">
          <div
            class="line"
            *ngFor="let line of bootSequence; let i = index"
            [style.animation-delay]="i * 0.8 + 's'"
            [class.visible]="bootLines[i]"
          >
            {{ line }}
          </div>
          <div class="instruction" *ngIf="showScrollInstruction">
            > ACCESS GRANTED - LOADING INTERFACE_
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="intro-section">
          <h2 class="section-title">TAAJIRAH SYSTEMS</h2>
          <p class="section-subtitle">
            > EDUCATION • AI INNOVATION • DIGITAL EXPERIENCES
          </p>

          <!-- Countdown timer -->
          <div class="countdown-container" *ngIf="showCountdown">
            <div class="countdown-label">SYSTEM UPTIME:</div>
            <div class="countdown">{{ systemUptime }}</div>
          </div>
        </div>
        <div class="card-container">
          <ion-card class="course-card">
            <div class="accent-line"></div>
            <div class="image-container">
              <div class="image-overlay"></div>
              <img
                src="assets/images/courses/quraanic_course.png"
                alt="Quraanic Arabic Course"
                loading="lazy"
              />
              <div class="card-overlay-text">
                <h2>Quraanic Arabic</h2>
              </div>
              <ion-badge class="free-badge">FREE</ion-badge>
            </div>
            <ion-card-header>
              <ion-card-title
                >Free Beginner Quraanic Arabic Course</ion-card-title
              >
              <div class="sub-line">
                Nahw (Grammar) • Sarf (Morphology) • Readings
              </div>
            </ion-card-header>
            <ion-card-content>
              <p class="micro-blurb">
                Master Quranic Arabic grammar and morphology with interactive
                PDFs by Abdullah Abrahams. Get personalized help from your AI
                study companion.
              </p>

              <div class="features-list">
                <div class="feature">🤖 AI Study Assistant</div>
                <div class="feature">📖 Interactive PDFs</div>
                <div class="feature">🎓 Self-Paced Learning</div>
              </div>

              <!-- Email Form for first-time users -->
              <form
                *ngIf="!hasEmail && !isInitializing"
                [formGroup]="emailForm"
                (ngSubmit)="submitEmail()"
              >
                <div class="email-field">
                  <ion-input
                    #emailInput
                    fill="outline"
                    label="Your email"
                    type="email"
                    formControlName="email"
                    placeholder="Enter your email for instant access"
                    (ionInput)="onEmailInput()"
                    [class.valid-email]="isValidEmail"
                    [class.invalid-email]="
                      emailForm.get('email')?.touched &&
                      emailForm.get('email')?.invalid
                    "
                    tabindex="1"
                  ></ion-input>

                  @if (emailForm.get('email')?.touched &&
                  emailForm.get('email')?.invalid) {
                  <ion-text color="danger" class="error-message">
                    Please enter a valid email address
                  </ion-text>
                  } @if (errorMessage) {
                  <ion-text color="danger" class="error-message">
                    {{ errorMessage }}
                    <ion-button
                      fill="clear"
                      size="small"
                      (click)="clearError()"
                    >
                      Try Again
                    </ion-button>
                  </ion-text>
                  }
                </div>

                <ion-button
                  expand="block"
                  fill="solid"
                  class="cta-button"
                  type="submit"
                  [disabled]="emailForm.invalid || isSubmitting"
                  (keydown.enter)="submitEmail()"
                  tabindex="2"
                >
                  <ion-spinner
                    *ngIf="isSubmitting"
                    name="dots"
                    class="button-spinner"
                  ></ion-spinner>
                  <span *ngIf="!isSubmitting">Start the Course ➔</span>
                </ion-button>
              </form>

              <!-- Direct button for returning users -->
              <ion-button
                *ngIf="hasEmail && !isInitializing"
                expand="block"
                fill="solid"
                class="cta-button"
                (click)="navigateToNotebook()"
                (keydown.enter)="navigateToNotebook()"
                tabindex="1"
              >
                Continue Learning ➔
              </ion-button>

              <!-- Enhanced Loading state -->
              <div *ngIf="isInitializing" class="loading-container">
                <div class="loading-skeleton">
                  <div class="skeleton-avatar"></div>
                  <div class="skeleton-lines">
                    <div class="skeleton-line long"></div>
                    <div class="skeleton-line medium"></div>
                    <div class="skeleton-line short"></div>
                  </div>
                </div>
                <div class="loading-text">
                  <ion-spinner name="dots" class="ai-spinner"></ion-spinner>
                  <p class="loading-message">{{ loadingMessage }}</p>
                  <div class="loading-progress">
                    <div
                      class="progress-bar"
                      [style.width.%]="loadingProgress"
                    ></div>
                  </div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Additional Products -->
          <ion-card
            class="project-card modern"
            (click)="navigateTo82ndrop()"
            (keydown.enter)="navigateTo82ndrop()"
            (keydown.space)="navigateTo82ndrop()"
            tabindex="3"
          >
            <div class="accent-line modern-accent"></div>
            <ion-card-header>
              <ion-card-title>82ndrop</ion-card-title>
              <div class="sub-line modern-sub">
                AI Video Creation • Veo3 Powered
              </div>
            </ion-card-header>
            <ion-card-content>
              <p class="description">
                Create viral 8-second AI videos using advanced Veo3 technology.
                Generate short-form content with instant impact.
              </p>
              <div class="tech-specs">
                <div class="spec">⚡ 8-Second Format</div>
                <div class="spec">🤖 Veo3 AI Engine</div>
                <div class="spec">📱 Layered Visuals</div>
              </div>
              <div class="price-container modern-price">
                <div class="cta modern-cta">Create AI Videos →</div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Claude Subagents Marketplace -->
          <ion-card
            class="project-card marketplace"
            (click)="navigateToSubagents()"
            (keydown.enter)="navigateToSubagents()"
            (keydown.space)="navigateToSubagents()"
            tabindex="4"
          >
            <div class="accent-line marketplace-accent"></div>
            <ion-card-header>
              <ion-card-title>Claude Subagents</ion-card-title>
              <div class="sub-line marketplace-sub">
                AI Agents Marketplace • Open Source
              </div>
            </ion-card-header>
            <ion-card-content>
              <p class="description">
                Discover and share specialized Claude AI agents. The GitHub for
                Claude agents with 51+ agents available.
              </p>
              <div class="tech-specs">
                <div class="spec">🤖 51+ AI Agents</div>
                <div class="spec">🔗 GitHub Integration</div>
                <div class="spec">📦 One-Click Download</div>
              </div>
              <div class="price-container marketplace-price">
                <div class="cta marketplace-cta">Explore Agents →</div>
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
        --primary-color: #00ff00;
        --primary-light: rgba(0, 255, 0, 0.1);
        --primary-dark: #00cc00;
        --accent-color: #00ffff;
        --text-dark: #ffffff;
        --text-medium: #cccccc;
        --text-light: #999999;
        --cyberpunk-glow: rgba(0, 255, 0, 0.3);
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
        --background: rgba(0, 0, 0, 0.9);
        --color: var(--text-dark);
        --border-style: none;
        box-shadow: 0 2px 4px rgba(0, 255, 0, 0.2);
        border-bottom: 1px solid rgba(0, 255, 0, 0.3);
        --min-height: 60px;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
      }

      .logo {
        height: 40px;
        width: auto;
      }

      .brand {
        font-size: 1.5rem;
        color: var(--primary-dark);
        margin: 0;
        font-family: 'Arial', sans-serif;
        font-weight: 600;
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

      .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        max-width: 1200px;
        width: 100%;
        margin-top: 1.5rem;
      }

      @media screen and (min-width: 768px) {
        .card-container {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .section-title {
          font-size: 3rem;
        }
      }

      @media screen and (max-width: 767px) {
        .section-title {
          font-size: 2rem;
        }

        .content-container {
          padding: calc(env(safe-area-inset-top, 0px) + 60px + 1rem) 1rem 1rem
            1rem;
          min-height: calc(100vh - env(safe-area-inset-bottom, 0px));
        }

        .intro-section {
          margin-bottom: 1.5rem;
          margin-top: 1rem;
        }

        .logo-container {
          padding: 0.5rem;
        }

        .brand {
          font-size: 1.3rem;
        }

        .logo {
          height: 35px;
        }

        /* Better touch targets */
        .cta-button {
          min-height: 48px;
          font-size: 1rem;
          margin: 1.5rem 0;
          padding: 0 1rem;
        }

        .feature {
          padding: 0.5rem 0.8rem;
          font-size: 0.8rem;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .features-list {
          gap: 0.8rem;
          margin: 1.5rem 0;
        }

        /* Card touch improvements */
        .project-card {
          margin-bottom: 2rem;
          padding: 0.5rem;
        }

        .project-card ion-card-content {
          padding: 1.5rem;
        }

        /* Email input improvements */
        .email-field {
          margin-bottom: 1.5rem;
        }

        ion-input {
          --padding-start: 1rem;
          --padding-end: 1rem;
          min-height: 48px;
        }

        /* Better spacing for touch */
        .card-container {
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }

        /* Touch-friendly error buttons */
        .error-message ion-button {
          min-height: 32px;
          margin-top: 0.5rem;
        }
      }

      /* Course card styles */
      .course-card {
        box-shadow: 0 4px 16px var(--cyberpunk-glow);
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin: 0;
        position: relative;
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid var(--primary-color);
        backdrop-filter: blur(10px);
      }

      .course-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 255, 0, 0.4);
        border-color: var(--accent-color);
      }

      .accent-line {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 6px;
        background: var(--primary-color);
        z-index: 1;
      }

      .image-container {
        position: relative;
        width: 100%;
        height: 120px;
        background: var(--primary-dark);
        overflow: hidden;
      }

      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.35;
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
        top: 16px;
        right: 16px;
        font-size: 0.9rem;
        padding: 8px 12px;
        font-weight: bold;
        z-index: 3;
        --background: var(--accent-color);
        --color: #222;
        border-radius: 4px;
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
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-top: 1rem;
        --background: var(--primary-color);
        --background-activated: var(--primary-dark);
        --background-focused: var(--primary-dark);
        --background-hover: var(--primary-dark);
        --color: #000000;
        height: 48px;
        position: relative;
        box-shadow: 0 0 20px var(--cyberpunk-glow);
        transition: all 0.3s ease;
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
      }

      .spec:hover {
        background: rgba(0, 255, 255, 0.2);
        border-color: var(--accent-color);
        transform: scale(1.05);
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

      /* Marketplace theme for Claude Subagents */
      .marketplace {
        background: rgba(40, 20, 0, 0.9);
        border: 2px solid #ff6b35;
        color: var(--text-dark);
        backdrop-filter: blur(10px);
      }

      .marketplace:hover {
        border-color: #ff8c42;
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
        transform: translateY(-3px);
      }

      .marketplace ion-card-title {
        color: #ff6b35;
        font-weight: 700;
        font-size: 1.2rem;
        text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
      }

      .marketplace-sub {
        color: var(--text-medium) !important;
        font-weight: 500;
        font-size: 0.9rem !important;
      }

      .marketplace .description {
        color: var(--text-medium);
        margin-bottom: 1.5rem;
      }

      .marketplace .spec {
        background: rgba(255, 107, 53, 0.1);
        color: #ff6b35;
        border: 1px solid rgba(255, 107, 53, 0.3);
        text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
      }

      .marketplace .spec:hover {
        background: rgba(255, 107, 53, 0.2);
        border-color: #ff6b35;
        transform: scale(1.05);
      }

      .marketplace-price {
        border-top: 1px solid rgba(255, 107, 53, 0.3);
        padding-top: 1rem;
        text-align: center;
      }

      .marketplace-cta {
        color: #ff6b35;
        font-weight: 600;
        font-size: 1.1rem;
        text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
      }

      .marketplace-accent {
        background: linear-gradient(90deg, #ff6b35, transparent) !important;
      }

      .marketplace-cta {
        animation: marketplace-pulse 2s infinite;
      }

      @keyframes marketplace-pulse {
        0%,
        100% {
          text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
        }
        50% {
          text-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
        }
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .modern-cta {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
        }
        50% {
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
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

      @keyframes typeIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

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
        margin-bottom: 1rem;
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
    IonInput,
    IonText,
    IonSpinner,
  ],
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('content') content!: IonContent;
  @ViewChild('emailInput') emailInput!: any;

  emailForm: FormGroup;
  isInitializing = true;
  isSubmitting = false;
  errorMessage = '';
  hasEmail = false;
  userId = '';
  isValidEmail = false;

  // Loading state properties
  loadingMessage = 'Initializing AI systems...';
  loadingProgress = 0;

  // Connection status
  isOffline = false;

  // Boot sequence properties
  bootComplete = false;
  showScrollInstruction = false;
  showCountdown = false;
  systemUptime = '';
  bootLines: boolean[] = [];
  bootSequence = [
    'INITIALIZING SYSTEMS...',
    'LOADING INTERFACE...',
    'ACCESS GRANTED',
  ];

  constructor(
    private router: Router,
    private emailService: EmailCollectionService,
    private fb: FormBuilder,
    private analytics: AnalyticsService,
    private seo: SeoService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    // SEO optimization for landing page
    this.seo.updateMetaTags({
      title:
        'TAAJIRAH - AI-Powered Quranic Arabic Learning & Video Creation Platform',
      description:
        'Master Quranic Arabic with AI-powered interactive learning and create viral AI videos with 82ndrop. Free beginner course with AI study assistant. Advanced Veo3 video generation technology.',
      keywords:
        'Quranic Arabic, Arabic learning, AI education, video creation, Veo3, AI videos, Islamic education, language learning, 82ndrop, TAAJIRAH',
      url: window.location.href,
      type: 'website',
      author: 'Abdullah Abrahams',
    });

    this.seo.updateAIOptimizedTags({
      topic: 'AI-Powered Education Platform',
      intent: 'learning_and_creation',
      expertise_level: 'all_levels',
      content_type: 'educational_platform',
      ai_features: [
        'AI Study Assistant',
        'Veo3 Video Generation',
        'Interactive Learning',
      ],
      learning_outcomes: [
        'Quranic Arabic Grammar',
        'Arabic Morphology',
        'AI Video Creation',
      ],
    });

    // Track page view and AI search optimization
    this.analytics.trackPageView('TAAJIRAH Landing', window.location.href);
    this.analytics.trackSearchBehavior(
      'education_platform_visit',
      'landing_page_view'
    );

    // Initialize boot sequence
    this.bootLines = new Array(this.bootSequence.length).fill(false);
    this.initializeBootSequence();

    try {
      // Start loading sequence
      this.startLoadingSequence();

      // Create anonymous user if needed
      this.userId = await this.emailService.createAnonymousUserIfNeeded();

      // Subscribe to user changes
      this.emailService.currentUser$.subscribe((user) => {
        this.hasEmail = !!user?.email;

        // Track user type for analytics
        if (user?.email) {
          this.analytics.setUserProperties({
            user_type: 'returning_user',
            learning_level: 'engaged',
            ai_usage: 'course_access',
            platform_preference: this.getDeviceType(),
          });
          this.analytics.trackEvent(
            'user_return',
            'user_journey',
            'existing_user'
          );
        } else {
          this.analytics.setUserProperties({
            user_type: 'new_visitor',
            learning_level: 'beginner',
            ai_usage: 'none',
            platform_preference: this.getDeviceType(),
          });
          this.analytics.trackEvent('user_visit', 'user_journey', 'new_user');
        }
      });

      this.isInitializing = false;
    } catch (error: any) {
      console.error('Error initializing user:', error);

      // Track initialization error
      this.analytics.trackError(error, 'user_initialization', {
        component: 'landing',
        stage: 'ngOnInit',
      });

      this.analytics.trackEvent(
        'error',
        'system',
        'user_initialization_failed'
      );
      this.errorMessage =
        'Unable to initialize session. Please try refreshing the page.';
      this.isInitializing = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Scroll to top when landing page loads
      if (this.content) {
        this.content.scrollToTop(500);
      }

      // Auto-focus email input for new users (after boot sequence)
      if (!this.hasEmail && !this.isInitializing) {
        setTimeout(() => {
          this.focusEmailInput();
        }, 3000); // After boot sequence completes
      }

      // Track performance metrics after view initialization
      this.trackPerformanceMetrics();
    }, 100);
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

    // Track resource loading performance
    setTimeout(() => {
      this.analytics.trackResourcePerformance();
    }, 2000);

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

        // Update the user with email
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

  private initializeBootSequence() {
    // Show boot lines one by one
    this.bootSequence.forEach((_, index) => {
      setTimeout(() => {
        this.bootLines[index] = true;

        // Show instruction after last line
        if (index === this.bootSequence.length - 1) {
          setTimeout(() => {
            this.showScrollInstruction = true;
            setTimeout(() => {
              this.bootComplete = true;
              this.showCountdown = true;
              this.initializeUptime();
            }, 2000);
          }, 1000);
        }
      }, index * 400);
    });
  }

  private initializeUptime() {
    const startTime = Date.now();

    const updateUptime = () => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);

      this.systemUptime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    updateUptime();
    setInterval(updateUptime, 1000);
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

  // Enhanced loading sequence with progress
  private startLoadingSequence() {
    const messages = [
      'Connecting to AI systems...',
      'Loading neural networks...',
      'Preparing study environment...',
      'Almost ready...',
    ];

    let messageIndex = 0;
    let progress = 0;

    const updateLoading = () => {
      if (messageIndex < messages.length) {
        this.loadingMessage = messages[messageIndex];
        this.loadingProgress = (messageIndex + 1) * 25;
        messageIndex++;

        setTimeout(updateLoading, 800);
      }
    };

    updateLoading();
  }

  // Handle offline/online status
  private setupOfflineHandling() {
    this.isOffline = !navigator.onLine;

    window.addEventListener('online', () => {
      this.isOffline = false;
      this.loadingMessage = 'Connection restored!';
    });

    window.addEventListener('offline', () => {
      this.isOffline = true;
      this.loadingMessage = 'You are offline. Some features may be limited.';
    });
  }
}

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
          />
          <h1 class="brand">TAAJIRAH</h1>
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
                Interactive PDFs by Abdullah Abrahams — Enhanced learning with
                AI-powered study companion.
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
                    fill="outline"
                    label="Your email"
                    type="email"
                    formControlName="email"
                    placeholder="Enter your email to start"
                  ></ion-input>

                  @if (emailForm.get('email')?.touched &&
                  emailForm.get('email')?.invalid) {
                  <ion-text color="danger" class="error-message">
                    Please enter a valid email address
                  </ion-text>
                  } @if (errorMessage) {
                  <ion-text color="danger" class="error-message">
                    {{ errorMessage }}
                  </ion-text>
                  }
                </div>

                <ion-button
                  expand="block"
                  fill="solid"
                  class="cta-button"
                  type="submit"
                  [disabled]="emailForm.invalid || isSubmitting"
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
              >
                Continue Learning ➔
              </ion-button>

              <!-- Loading state -->
              <div *ngIf="isInitializing" class="loading-container">
                <ion-spinner name="dots"></ion-spinner>
                <p>Loading...</p>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- Additional Products -->
          <ion-card class="project-card modern" (click)="navigateTo82ndrop()">
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
        grid-template-columns: 1fr;
        gap: 1.5rem;
        max-width: 900px;
        width: 100%;
        margin-top: 1.5rem;
      }

      @media screen and (min-width: 768px) {
        .card-container {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

      .cta-button:hover {
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.6);
        transform: translateY(-2px);
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

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }

      .loading-container p {
        margin-top: 0.5rem;
        color: var(--text-medium);
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

  emailForm: FormGroup;
  isInitializing = true;
  isSubmitting = false;
  errorMessage = '';
  hasEmail = false;
  userId = '';

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
    private fb: FormBuilder
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    // Initialize boot sequence
    this.bootLines = new Array(this.bootSequence.length).fill(false);
    this.initializeBootSequence();

    try {
      // Create anonymous user if needed
      this.userId = await this.emailService.createAnonymousUserIfNeeded();

      // Subscribe to user changes
      this.emailService.currentUser$.subscribe((user) => {
        this.hasEmail = !!user?.email;
      });

      this.isInitializing = false;
    } catch (error) {
      console.error('Error initializing user:', error);
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
    }, 100);
  }

  async submitEmail() {
    if (this.emailForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const { email } = this.emailForm.value;

        // Update the user with email
        await this.emailService.updateUserWithEmail(this.userId, email);

        // Navigate to notebook
        this.navigateToNotebook();
      } catch (error: any) {
        console.error('Error submitting email:', error);
        this.errorMessage =
          error.message || 'Error processing your email. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  navigateToNotebook() {
    // Get notebook URL from service
    const notebookUrl = this.emailService.getNotebookUrl();

    // Redirect to the notebook
    window.location.href = notebookUrl;
  }

  navigateTo82ndrop() {
    window.open('https://82ndrop.web.app/', '_blank', 'noopener,noreferrer');
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
}

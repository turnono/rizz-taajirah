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
      <div class="content-container">
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
                PDFs by Abdullah Abrahams — study anytime in our AI Notebook
                (LLM-powered).
              </p>

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

          <!-- Calculated Mistake card is hidden for now -->
          <!--
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
          -->
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        --primary-color: #3a824a;
        --primary-light: #edfaf2;
        --primary-dark: #2a6038;
        --accent-color: #e9c54c;
        --text-dark: #333;
        --text-medium: #555;
        --text-light: #777;
      }

      ion-content {
        --background: var(--primary-light);
      }

      ion-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
      }

      ion-toolbar {
        --background: white;
        --border-style: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        box-sizing: border-box;
      }

      .card-container {
        max-width: 600px;
        width: 100%;
        margin-top: 2rem;
      }

      /* Course card styles */
      .course-card {
        box-shadow: 0 8px 24px rgba(58, 130, 74, 0.15);
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin: 0;
        position: relative;
        background: white;
        border: 1px solid rgba(58, 130, 74, 0.1);
      }

      .course-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(58, 130, 74, 0.25);
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
        height: 200px;
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
        font-size: 2rem;
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
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 0.5rem;
      }

      .sub-line {
        color: var(--text-medium);
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }

      .micro-blurb {
        font-size: 0.95rem;
        color: var(--text-medium);
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .cta-button {
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-top: 1rem;
        --background: var(--primary-color);
        --background-activated: var(--primary-dark);
        --background-focused: var(--primary-dark);
        --background-hover: var(--primary-dark);
        height: 48px;
        position: relative;
      }

      /* Cyberpunk styles (hidden for now) */
      /*
      .cyberpunk {
        background: #000;
        color: #0f0;
        border: 2px solid #0f0;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }

      .cyberpunk ion-card-title {
        color: #0f0;
        text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
        font-family: monospace;
        margin-bottom: 1rem;
      }

      .cyberpunk .description {
        color: #0f0;
        font-family: monospace;
        margin-bottom: 2rem;
      }

      .cyberpunk .price-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(0, 255, 0, 0.3);
        padding-top: 1rem;
      }

      .cyberpunk .price {
        font-family: monospace;
        color: #0f0;
      }

      .cyberpunk .cta {
        font-family: monospace;
        color: #0f0;
        animation: blink 1.5s infinite;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      */

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
}

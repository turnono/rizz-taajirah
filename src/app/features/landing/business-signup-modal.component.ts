import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-business-signup-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonIcon,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>🎁 GET EARLY ACCESS TO HADIYA</ion-title>
        <ion-button slot="end" fill="clear" (click)="closeModal()">
          <ion-icon name="close"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="cyberpunk-content" [scrollY]="true">
      <div class="modal-content">
        <h2>🚀 Join the Hadiya Early Access Program</h2>
        <p>
          Be among the first businesses to leverage AI-powered gift discovery.
          Transform your customer engagement with intelligent gift
          recommendations.
        </p>

        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <ion-item>
            <ion-label position="stacked">Business Name *</ion-label>
            <ion-input
              formControlName="businessName"
              placeholder="Your business name"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Contact Email *</ion-label>
            <ion-input
              formControlName="email"
              placeholder="business@example.com"
              type="email"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Business Type</ion-label>
            <ion-select
              formControlName="businessType"
              placeholder="Select your business type"
            >
              <ion-select-option value="retail">Retail Store</ion-select-option>
              <ion-select-option value="restaurant"
                >Restaurant/Café</ion-select-option
              >
              <ion-select-option value="services">Services</ion-select-option>
              <ion-select-option value="artisan"
                >Artisan/Crafts</ion-select-option
              >
              <ion-select-option value="other">Other</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Location (City, Country)</ion-label>
            <ion-input
              formControlName="location"
              placeholder="e.g., Cape Town, South Africa"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Tell us about your business</ion-label
            >
            <ion-textarea
              formControlName="description"
              placeholder="Brief description of your business..."
              rows="3"
            ></ion-textarea>
          </ion-item>

          <ion-button
            expand="block"
            type="submit"
            [disabled]="signupForm.invalid || isSubmitting"
            class="submit-btn"
          >
            <span *ngIf="!isSubmitting">🚀 JOIN EARLY ACCESS</span>
            <span *ngIf="isSubmitting">⚡ SUBMITTING...</span>
          </ion-button>

          <div
            *ngIf="message"
            class="message"
            [class.success]="isSuccess"
            [class.error]="!isSuccess"
          >
            {{ message }}
          </div>
        </form>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .cyberpunk-content {
        --background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        --color: #ffffff;
      }

      .modal-content {
        padding: 20px;
        padding-bottom: 40px;
        color: #ffffff;
        min-height: 100%;
      }

      .modal-content h2 {
        color: #00ffff;
        margin-bottom: 15px;
        font-size: 1.4rem;
        font-weight: 600;
        text-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
      }

      .modal-content p {
        color: #cccccc;
        margin-bottom: 30px;
        line-height: 1.6;
      }

      ion-item {
        --background: rgba(0, 0, 0, 0.3);
        --border-color: rgba(0, 255, 0, 0.3);
        --color: #ffffff;
        margin-bottom: 15px;
        border-radius: 8px;
      }

      ion-label {
        color: #00ff00 !important;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: 'Courier New', monospace;
      }

      ion-input,
      ion-textarea {
        --color: #ffffff;
        --placeholder-color: rgba(255, 255, 255, 0.5);
      }

      ion-select {
        --color: #ffffff;
        --placeholder-color: rgba(255, 255, 255, 0.5);
      }

      .submit-btn {
        --background: linear-gradient(45deg, #00ff00, #00ffff);
        --color: #000;
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: 'Courier New', monospace;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 50px !important;
        position: relative !important;
        z-index: 10 !important;
      }

      .message {
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        backdrop-filter: blur(10px);
      }

      .message.success {
        background: rgba(0, 255, 0, 0.1);
        color: #00ff00;
        border: 1px solid rgba(0, 255, 0, 0.3);
        text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
      }

      .message.error {
        background: rgba(255, 107, 157, 0.1);
        color: #ff6b9d;
        border: 1px solid rgba(255, 107, 157, 0.3);
        text-shadow: 0 0 5px rgba(255, 107, 157, 0.3);
      }

      ion-toolbar {
        --background: #0a0a0a;
        --color: #00ff00;
        --border-color: rgba(0, 255, 0, 0.3);
      }

      ion-title {
        color: #00ff00;
        font-weight: 700;
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        font-family: 'Courier New', monospace;
      }
    `,
  ],
})
export class BusinessSignupModalComponent {
  @Input() isSubmitting = false;
  @Input() message = '';
  @Input() isSuccess = false;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      businessType: [''],
      location: [''],
      description: [''],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.formSubmit.emit(this.signupForm.value);
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }

  closeModal() {
    this.close.emit();
  }
}

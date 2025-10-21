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
  ModalController,
  IonLabel,
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
  ],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>🎁 GET EARLY ACCESS TO HADIYA</ion-title>
        <ion-button slot="end" fill="clear" (click)="closeModal()">
          ✕
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding ion-margin" [scrollY]="true">
      <h2 style="margin-left: 16px; margin-right: 16px;">
        🚀 Join the Hadiya Early Access Program
      </h2>
      <p style="margin-left: 16px; margin-right: 16px;">
        Be among the first businesses to leverage AI-powered gift discovery.
        Transform your customer engagement with intelligent gift
        recommendations.
      </p>

      <form
        style="margin-left: 16px; margin-right: 16px;"
        [formGroup]="signupForm"
        (ngSubmit)="onSubmit()"
      >
        <ion-item>
          <ion-input
            formControlName="businessName"
            label="Business Name *"
            labelPlacement="floating"
            placeholder="Your business name"
            type="text"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            formControlName="email"
            label="Contact Email *"
            labelPlacement="floating"
            placeholder="business@example.com"
            type="email"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-select
            formControlName="businessType"
            label="Business Type"
            labelPlacement="floating"
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
          <ion-input
            formControlName="location"
            label="Location (City, Country)"
            labelPlacement="floating"
            placeholder="e.g., Cape Town, South Africa"
            type="text"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-textarea
            formControlName="description"
            label="Tell us about your business"
            labelPlacement="floating"
            placeholder="Brief description of your business..."
            rows="3"
          ></ion-textarea>
        </ion-item>

        <ion-button
          expand="block"
          type="submit"
          [disabled]="signupForm.invalid || isSubmitting"
          class="submit-btn"
          (click)="onSubmit()"
        >
          <span *ngIf="!isSubmitting">🚀 JOIN EARLY ACCESS 🎁 FOR FREE</span>
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
    </ion-content>
  `,
  styles: [
    `
      .modal-content {
        padding: 20px;
      }

      .modal-content h2 {
        color: #00ffff;
        margin-bottom: 15px;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .modal-content p {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .submit-btn {
        margin-top: 20px;
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

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.signupForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      businessType: [''],
      location: [''],
      description: [''],
    });

    // Enable the form by default
    this.signupForm.markAsTouched();
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      this.message = '';

      try {
        // Emit the form data
        this.formSubmit.emit(this.signupForm.value);

        // Close the modal with the form data
        await this.modalCtrl.dismiss({ formData: this.signupForm.value });
      } catch (error) {
        console.error('Error submitting form:', error);
        this.message = 'Error submitting form. Please try again.';
        this.isSubmitting = false;
      }
    } else {
      this.message = 'Please fill in all required fields.';
    }
  }

  async closeModal() {
    this.close.emit();
    await this.modalCtrl.dismiss();
  }
}

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
  IonSelect,
  IonSelectOption,
  IonItem,
  IonCheckbox,
  IonLabel,
  ModalController,
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
    IonItem,
    IonCheckbox,
    IonLabel,
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

    <ion-content
      class="ion-padding"
      [scrollY]="true"
      style="--padding-bottom: 100px;"
    >
      <h2 style="margin-left: 16px; margin-right: 16px;">
        🎁 Get your products recommended by AI
      </h2>
      <p style="margin-left: 16px; margin-right: 16px;">
        Hadiya is an AI-powered gift discovery tool that recommends real gifts
        from real businesses. We're inviting selected vendors to join our early
        access program.
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
            formControlName="contactPerson"
            label="Contact Person *"
            labelPlacement="floating"
            placeholder="Your full name"
            type="text"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            formControlName="email"
            label="Email Address *"
            labelPlacement="floating"
            placeholder="your@email.com"
            type="email"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            formControlName="phone"
            label="Phone Number"
            labelPlacement="floating"
            placeholder="+27 82 123 4567"
            type="tel"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-input
            formControlName="websiteOrSocial"
            label="Website or Social Handle"
            labelPlacement="floating"
            placeholder="Instagram, Facebook, website, etc."
            type="text"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-checkbox
            formControlName="contentCreatorInterest"
            slot="start"
          ></ion-checkbox>
          <ion-label>
            I'm interested in working with content creators when ready.
          </ion-label>
        </ion-item>

        <ion-button
          expand="block"
          type="submit"
          [disabled]="signupForm.invalid || isSubmitting"
          class="submit-btn"
          style="margin-bottom: 20px;"
          (click)="onSubmit()"
        >
          <span *ngIf="!isSubmitting">👉 Apply for Early Access</span>
          <span *ngIf="isSubmitting">⚡ Submitting...</span>
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
      contactPerson: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      websiteOrSocial: [''],
      contentCreatorInterest: [false],
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

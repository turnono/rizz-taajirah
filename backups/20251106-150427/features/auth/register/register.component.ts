import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Create Account</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <ion-item>
              <ion-label position="floating">Display Name</ion-label>
              <ion-input formControlName="displayName"></ion-input>
            </ion-item>
            @if (registerForm.get('displayName')?.touched &&
            registerForm.get('displayName')?.invalid) {
            <ion-text color="danger" class="error-message">
              Display name is required
            </ion-text>
            }

            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" formControlName="email"></ion-input>
            </ion-item>
            @if (registerForm.get('email')?.touched &&
            registerForm.get('email')?.invalid) {
            <ion-text color="danger" class="error-message">
              Please enter a valid email address
            </ion-text>
            }

            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" formControlName="password"></ion-input>
            </ion-item>
            @if (registerForm.get('password')?.touched &&
            registerForm.get('password')?.invalid) {
            <ion-text color="danger" class="error-message">
              Password must be at least 6 characters
            </ion-text>
            } @if (errorMessage) {
            <ion-text color="danger" class="error-message">
              {{ errorMessage }}
            </ion-text>
            }

            <ion-button
              expand="block"
              type="submit"
              [disabled]="registerForm.invalid || isLoading"
            >
              {{ isLoading ? 'Creating account...' : 'Register' }}
            </ion-button>
          </form>

          <div class="auth-links">
            <ion-button fill="clear" routerLink="/auth/login">
              Already have an account? Login
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      ion-card {
        max-width: 400px;
        margin: 2rem auto;
      }

      ion-item {
        margin-bottom: 1rem;
      }

      .error-message {
        font-size: 0.8rem;
        margin: 0.5rem 0 1rem;
        display: block;
        padding: 0 1rem;
      }

      .auth-links {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const { email, password, displayName } = this.registerForm.value;

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          this.auth,
          email,
          password
        );

        // Create user document in Firestore
        await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
          email,
          displayName,
          role: 'user',
          createdAt: Timestamp.now(),
          lastLogin: Timestamp.now(),
          photoURL: null,
        });

        this.router.navigate(['/']);
      } catch (error: any) {
        this.errorMessage =
          error.message || 'An error occurred during registration';
      } finally {
        this.isLoading = false;
      }
    }
  }
}

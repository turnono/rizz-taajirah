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
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Welcome Back</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" formControlName="email"></ion-input>
            </ion-item>
            @if (loginForm.get('email')?.touched &&
            loginForm.get('email')?.invalid) {
            <ion-text color="danger" class="error-message">
              Please enter a valid email address
            </ion-text>
            }

            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" formControlName="password"></ion-input>
            </ion-item>
            @if (loginForm.get('password')?.touched &&
            loginForm.get('password')?.invalid) {
            <ion-text color="danger" class="error-message">
              Password is required
            </ion-text>
            } @if (errorMessage) {
            <ion-text color="danger" class="error-message">
              {{ errorMessage }}
            </ion-text>
            }

            <ion-button
              expand="block"
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
            >
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </ion-button>
          </form>

          <div class="auth-links">
            <ion-button fill="clear" routerLink="/auth/register">
              Don't have an account? Register
            </ion-button>
            <ion-button fill="clear" routerLink="/auth/forgot-password">
              Forgot Password?
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
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const { email, password } = this.loginForm.value;
        await signInWithEmailAndPassword(this.auth, email, password);
        this.router.navigate(['/']);
      } catch (error: any) {
        this.errorMessage = error.message || 'An error occurred during login';
      } finally {
        this.isLoading = false;
      }
    }
  }
}

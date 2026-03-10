import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  async login() {
    if (!this.email() || !this.password()) return;
    
    this.loading.set(true);
    this.errorMessage.set(null);
    
    try {
      await signInWithEmailAndPassword(this.auth, this.email(), this.password());
      this.router.navigate(['/portal/dashboard']);
    } catch (error: any) {
      console.error('Login error', error);
      // Clean up Firebase error messages for the user
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.errorMessage.set('Invalid secure email or access key.');
          break;
        case 'auth/too-many-requests':
          this.errorMessage.set('Too many failed attempts. Account temporarily locked.');
          break;
        default:
          this.errorMessage.set('An error occurred during authentication.');
      }
    } finally {
      this.loading.set(false);
    }
  }
}

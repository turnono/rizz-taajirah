import { Component, OnInit } from '@angular/core';
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
  IonList,
  IonListHeader,
  IonMenuButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '../../core/models/interfaces';

@Component({
  selector: 'app-account',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>My Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      @if (isLoading) {
      <div class="loading">Loading profile...</div>
      } @else {
      <ion-card>
        <ion-card-header>
          <ion-card-title>Profile Information</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <ion-item>
              <ion-label position="floating">Display Name</ion-label>
              <ion-input formControlName="displayName"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                formControlName="email"
                readonly
              ></ion-input>
            </ion-item>

            @if (errorMessage) {
            <ion-text color="danger" class="error-message">
              {{ errorMessage }}
            </ion-text>
            }

            <ion-button
              expand="block"
              type="submit"
              [disabled]="profileForm.invalid || isSaving"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </ion-button>
          </form>

          <ion-list>
            <ion-list-header>
              <ion-label>Account Actions</ion-label>
            </ion-list-header>

            <ion-item button (click)="logout()">
              <ion-label color="danger">Logout</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Order History</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          @if (orders.length === 0) {
          <p>No orders yet</p>
          } @else {
          <ion-list>
            @for (order of orders; track order.id) {
            <ion-item>
              <ion-label>
                <h2>Order #{{ order.id }}</h2>
                <p>Total: ₦{{ order.total.toLocaleString() }}</p>
                <p>Status: {{ order.status }}</p>
              </ion-label>
            </ion-item>
            }
          </ion-list>
          }
        </ion-card-content>
      </ion-card>
      }
    </ion-content>
  `,
  styles: [
    `
      ion-card {
        margin-bottom: 1rem;
      }

      .error-message {
        font-size: 0.8rem;
        margin: 0.5rem 0 1rem;
        display: block;
        padding: 0 1rem;
        color: var(--ion-color-danger);
      }

      .loading {
        text-align: center;
        padding: 2rem;
        color: var(--ion-color-medium);
      }

      ion-item {
        margin-bottom: 1rem;
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
    IonList,
    IonListHeader,
    IonMenuButton,
    IonButtons,
  ],
})
export class AccountComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  orders: any[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
    });
  }

  async ngOnInit() {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        this.router.navigate(['/auth/login']);
        return;
      }

      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      const userData = userDoc.data() as User;

      this.profileForm.patchValue({
        displayName: userData.displayName,
        email: userData.email,
      });

      // Load orders
      // TODO: Implement order loading from Firestore
    } catch (error: any) {
      this.errorMessage = error.message || 'Error loading profile';
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.errorMessage = '';

      try {
        const user = this.auth.currentUser;
        if (!user) throw new Error('No user logged in');

        const { displayName } = this.profileForm.value;
        await updateDoc(doc(this.firestore, 'users', user.uid), {
          displayName,
        });
      } catch (error: any) {
        this.errorMessage = error.message || 'Error updating profile';
      } finally {
        this.isSaving = false;
      }
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth/login']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error logging out';
    }
  }
}

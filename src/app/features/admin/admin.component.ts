import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonList,
  IonListHeader,
  IonMenuButton,
  IonButtons,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order, User } from '../../core/models/interfaces';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  bookOutline,
  cartOutline,
  schoolOutline,
  bagHandleOutline,
  analyticsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-admin',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Admin Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="stats-grid">
        <ion-card>
          <ion-card-content>
            <ion-icon name="people-outline"></ion-icon>
            <div class="stat">
              <h2>Total Users</h2>
              <p>{{ (users$ | async)?.length || 0 }}</p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-content>
            <ion-icon name="cart-outline"></ion-icon>
            <div class="stat">
              <h2>Total Orders</h2>
              <p>{{ (orders$ | async)?.length || 0 }}</p>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-content>
            <ion-icon name="analytics-outline"></ion-icon>
            <div class="stat">
              <h2>Revenue</h2>
              <p>₦{{ totalRevenue | number }}</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Recent Orders</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            @for (order of orders$ | async; track order.id) {
            <ion-item>
              <ion-label>
                <h2>Order #{{ order.id }}</h2>
                <p>Total: ₦{{ order.total.toLocaleString() }}</p>
                <p>Status: {{ order.status }}</p>
              </ion-label>
              <ion-badge [color]="getStatusColor(order.status)" slot="end">
                {{ order.status }}
              </ion-badge>
            </ion-item>
            }
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-list-header>
          <ion-label>Quick Actions</ion-label>
        </ion-list-header>

        <ion-item button routerLink="/admin/products">
          <ion-icon name="bag-handle-outline" slot="start"></ion-icon>
          <ion-label>Manage Products</ion-label>
        </ion-item>

        <ion-item button routerLink="/admin/books">
          <ion-icon name="book-outline" slot="start"></ion-icon>
          <ion-label>Manage Books</ion-label>
        </ion-item>

        <ion-item button routerLink="/admin/courses">
          <ion-icon name="school-outline" slot="start"></ion-icon>
          <ion-label>Manage Courses</ion-label>
        </ion-item>

        <ion-item button routerLink="/admin/users">
          <ion-icon name="people-outline" slot="start"></ion-icon>
          <ion-label>Manage Users</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        margin-bottom: 1rem;
      }

      .stat {
        text-align: center;
      }

      .stat h2 {
        color: var(--ion-color-medium);
        font-size: 0.9rem;
        margin: 0;
      }

      .stat p {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0.5rem 0 0;
      }

      ion-card-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      ion-icon {
        font-size: 2rem;
        color: var(--ion-color-primary);
      }

      ion-badge {
        text-transform: capitalize;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
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
    IonList,
    IonListHeader,
    IonMenuButton,
    IonButtons,
    IonBadge,
    IonIcon,
  ],
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]>;
  orders$: Observable<Order[]>;
  totalRevenue = 0;

  constructor(private firestore: Firestore) {
    this.users$ = collectionData(collection(this.firestore, 'users'), {
      idField: 'id',
    }) as Observable<User[]>;
    this.orders$ = collectionData(collection(this.firestore, 'orders'), {
      idField: 'id',
    }) as Observable<Order[]>;

    // Calculate total revenue
    this.orders$.subscribe((orders) => {
      this.totalRevenue = orders.reduce((total, order) => {
        return total + (order.paymentStatus === 'paid' ? order.total : 0);
      }, 0);
    });

    addIcons({
      'people-outline': peopleOutline,
      'book-outline': bookOutline,
      'cart-outline': cartOutline,
      'school-outline': schoolOutline,
      'bag-handle-outline': bagHandleOutline,
      'analytics-outline': analyticsOutline,
    });
  }

  ngOnInit() {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }
}

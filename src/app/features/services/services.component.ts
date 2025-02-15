import { Component } from '@angular/core';
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
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonChip,
} from '@ionic/angular/standalone';
import { CartService } from '../../core/services/cart.service';
import { WebService } from '../../core/models/interfaces';

@Component({
  selector: 'app-services',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Web Services</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Web Development Services</h1>
      <p>Professional web development solutions for your business</p>

      <div class="services-grid">
        @for (service of services; track service.id) {
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ service.name }}</ion-card-title>
            <p class="price">
              Starting from ₦{{ service.basePrice.toLocaleString() }}
            </p>
          </ion-card-header>
          <ion-card-content>
            <p>{{ service.description }}</p>

            <div class="features-section">
              <h3>What's Included:</h3>
              <ion-list>
                @for (feature of service.features; track feature) {
                <ion-item lines="none">
                  <ion-icon
                    name="checkmark-circle"
                    slot="start"
                    color="success"
                  ></ion-icon>
                  <ion-label>{{ feature }}</ion-label>
                </ion-item>
                }
              </ion-list>
            </div>

            <div class="timeline">
              <ion-chip color="primary">
                <ion-label>Timeline: {{ service.timeline }}</ion-label>
              </ion-chip>
            </div>

            <ion-button expand="block" (click)="requestService(service)">
              Request Service
              <ion-icon name="arrow-forward" slot="end"></ion-icon>
            </ion-button>
          </ion-card-content>
        </ion-card>
        }
      </div>

      <ion-card class="process-card">
        <ion-card-header>
          <ion-card-title>Our Process</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-icon
                name="chatbubbles"
                slot="start"
                color="primary"
              ></ion-icon>
              <ion-label>
                <h2>1. Consultation</h2>
                <p>Initial discussion to understand your requirements</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-icon
                name="document-text"
                slot="start"
                color="primary"
              ></ion-icon>
              <ion-label>
                <h2>2. Proposal</h2>
                <p>Detailed project proposal and timeline</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-icon
                name="code-working"
                slot="start"
                color="primary"
              ></ion-icon>
              <ion-label>
                <h2>3. Development</h2>
                <p>Building your solution with regular updates</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-icon
                name="checkmark-circle"
                slot="start"
                color="primary"
              ></ion-icon>
              <ion-label>
                <h2>4. Delivery</h2>
                <p>Final testing and project handover</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      .services-grid {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      ion-card {
        margin: 0;
      }

      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--ion-color-primary);
        margin: 0.5rem 0;
      }

      .features-section {
        margin: 1.5rem 0;
      }

      .features-section h3 {
        color: var(--ion-color-medium);
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      .timeline {
        margin: 1rem 0;
      }

      .process-card {
        margin-top: 2rem;
      }

      .process-card ion-item {
        --padding-start: 0;
      }

      .process-card ion-icon {
        font-size: 1.5rem;
      }

      .process-card h2 {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }

      .process-card p {
        color: var(--ion-color-medium);
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
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonButtons,
    IonChip,
  ],
})
export class ServicesComponent {
  services: WebService[] = [
    {
      id: 'web-basic',
      name: 'Basic Website Package',
      description: 'Perfect for small businesses and personal websites.',
      basePrice: 150000,
      features: [
        'Responsive Design',
        '5 Pages',
        'Contact Form',
        'Basic SEO',
        'Social Media Integration',
      ],
      timeline: '2-3 weeks',
      category: 'web-development',
    },
    {
      id: 'web-ecommerce',
      name: 'E-commerce Solution',
      description: 'Complete online store with payment integration.',
      basePrice: 450000,
      features: [
        'Product Management',
        'Payment Gateway Integration',
        'Order Management',
        'Customer Accounts',
        'Inventory Tracking',
        'Sales Analytics',
      ],
      timeline: '6-8 weeks',
      category: 'web-development',
    },
    {
      id: 'web-custom',
      name: 'Custom Web Application',
      description: 'Tailored web applications for your specific needs.',
      basePrice: 750000,
      features: [
        'Custom Features',
        'Database Design',
        'API Integration',
        'User Authentication',
        'Admin Dashboard',
        'Technical Documentation',
      ],
      timeline: '8-12 weeks',
      category: 'web-development',
    },
  ];

  constructor(private cartService: CartService) {}

  requestService(service: WebService) {
    this.cartService.addToCart({
      productId: service.id,
      productType: 'service',
      quantity: 1,
      price: service.basePrice,
    });
  }
}

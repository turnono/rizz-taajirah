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

      <!-- New Tech-Van Section -->
      <ion-card class="tech-van-card">
        <ion-card-header>
          <div class="tech-van-header">
            <ion-icon name="business" class="header-icon"></ion-icon>
            <ion-card-title>Tech-Van: Executive Transit & Mobile Workspace</ion-card-title>
          </div>
        </ion-card-header>
        <ion-card-content>
          <p class="tech-van-prop">
            Turn your commute into billable hours. The Taajirah Tech-Van offers secure, high-speed Wi-Fi and a premium mobile office environment for executives on the move.
          </p>
          
          <div class="rate-card">
            <ion-list>
              <ion-item lines="none">
                <ion-icon name="airplane" slot="start" color="primary"></ion-icon>
                <ion-label>OR Tambo ↔ Sandton Transfers</ion-label>
                <span slot="end" class="rate">R850</span>
              </ion-item>
              <ion-item lines="none">
                <ion-icon name="time" slot="start" color="primary"></ion-icon>
                <ion-label>Hourly Retainer / Executive Wait Time</ion-label>
                <span slot="end" class="rate">R350/hr</span>
              </ion-item>
              <ion-item lines="none">
                <ion-icon name="car" slot="start" color="primary"></ion-icon>
                <ion-label>Base Call-out</ion-label>
                <span slot="end" class="rate">R450</span>
              </ion-item>
            </ion-list>
          </div>

          <a href="https://wa.me/2767537092?text=Hi%20Concierge,%20I%20need%20to%20book%20the%20Tech-Van." target="_blank" class="tech-van-cta">
            Message Concierge to Book
            <ion-icon name="chatbubbles"></ion-icon>
          </a>
        </ion-card-content>
      </ion-card>

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

      /* Tech-Van Section Styles */
      .tech-van-card {
        margin-top: 2.5rem;
        background: rgba(0, 20, 0, 0.4);
        border: 1px solid var(--ion-color-primary);
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
      }

      .tech-van-header {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .tech-van-header .header-icon {
        font-size: 2rem;
        color: var(--ion-color-primary);
      }

      .tech-van-prop {
        font-size: 1.1rem;
        color: var(--ion-color-light);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .rate-card {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        padding: 0.5rem;
        margin-bottom: 2rem;
      }

      .rate-card ion-item {
        --background: transparent;
        --color: var(--ion-color-light);
      }

      .rate-card .rate {
        font-weight: bold;
        color: var(--ion-color-primary);
        font-size: 1.1rem;
        padding-left: 1rem;
      }

      .tech-van-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: #25D366; /* WhatsApp Green */
        color: #fff;
        padding: 1rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }

      .tech-van-cta:hover {
        background: #128C7E;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
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

  constructor(private cartService: CartService) { }

  requestService(service: WebService) {
    this.cartService.addToCart({
      productId: service.id,
      productType: 'service',
      quantity: 1,
      price: service.basePrice,
    });
  }
}

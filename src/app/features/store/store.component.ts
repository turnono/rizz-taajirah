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
  IonBadge,
  IonChip,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/interfaces';

@Component({
  selector: 'app-store',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Store</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Islamic Store</h1>
      <p>Discover our collection of perfumes and merchandise</p>

      <div class="category-section">
        <h2>Perfumes</h2>
        <div class="products-grid">
          @for (product of perfumes; track product.id) {
          <ion-card>
            <ion-grid class="image-grid">
              <ion-row>
                @for (image of product.images; track image) {
                <ion-col size="6">
                  <img [src]="image" [alt]="product.name" />
                </ion-col>
                }
              </ion-row>
            </ion-grid>
            <ion-card-header>
              <ion-card-title>{{ product.name }}</ion-card-title>
              <p class="price">₦{{ product.price.toLocaleString() }}</p>
            </ion-card-header>
            <ion-card-content>
              <p>{{ product.description }}</p>
              @if (product.features?.length) {
              <div class="features">
                @for (feature of product.features; track feature) {
                <ion-chip>
                  <ion-label>{{ feature }}</ion-label>
                </ion-chip>
                }
              </div>
              } @if (product.stock > 0) {
              <ion-button expand="block" (click)="addToCart(product)">
                Add to Cart
                <ion-icon name="cart" slot="end"></ion-icon>
              </ion-button>
              } @else {
              <ion-button expand="block" color="medium" disabled>
                Out of Stock
              </ion-button>
              }
            </ion-card-content>
          </ion-card>
          }
        </div>
      </div>

      <div class="category-section">
        <h2>Merchandise</h2>
        <div class="products-grid">
          @for (product of merchandise; track product.id) {
          <ion-card>
            <ion-grid class="image-grid">
              <ion-row>
                @for (image of product.images; track image) {
                <ion-col size="6">
                  <img [src]="image" [alt]="product.name" />
                </ion-col>
                }
              </ion-row>
            </ion-grid>
            <ion-card-header>
              <ion-card-title>{{ product.name }}</ion-card-title>
              <p class="price">₦{{ product.price.toLocaleString() }}</p>
            </ion-card-header>
            <ion-card-content>
              <p>{{ product.description }}</p>
              @if (product.features?.length) {
              <div class="features">
                @for (feature of product.features; track feature) {
                <ion-chip>
                  <ion-label>{{ feature }}</ion-label>
                </ion-chip>
                }
              </div>
              } @if (product.stock > 0) {
              <ion-button expand="block" (click)="addToCart(product)">
                Add to Cart
                <ion-icon name="cart" slot="end"></ion-icon>
              </ion-button>
              } @else {
              <ion-button expand="block" color="medium" disabled>
                Out of Stock
              </ion-button>
              }
            </ion-card-content>
          </ion-card>
          }
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .products-grid {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      .category-section {
        margin-bottom: 2rem;
      }

      .category-section h2 {
        color: var(--ion-color-primary);
        margin: 1rem 0;
      }

      ion-card {
        margin: 0;
      }

      .image-grid img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 4px;
      }

      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--ion-color-primary);
        margin: 0.5rem 0;
      }

      .features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      ion-chip {
        --background: var(--ion-color-light);
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
    IonBadge,
    IonChip,
    IonLabel,
    IonMenuButton,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class StoreComponent {
  perfumes: Product[] = [
    {
      id: 'misk-1',
      name: 'Royal Misk',
      description:
        'A luxurious blend of traditional Arabic misk with modern notes.',
      price: 15000,
      category: 'perfume',
      images: ['assets/images/perfume-1a.jpg', 'assets/images/perfume-1b.jpg'],
      stock: 50,
      sku: 'MISK001',
      features: ['Long-lasting', 'Alcohol-free', 'Natural ingredients'],
    },
    {
      id: 'oud-1',
      name: 'Premium Oud',
      description: 'Authentic oud fragrance with deep, woody notes.',
      price: 25000,
      category: 'perfume',
      images: ['assets/images/perfume-2a.jpg', 'assets/images/perfume-2b.jpg'],
      stock: 30,
      sku: 'OUD001',
      features: ['Premium quality', 'Rich aroma', 'Traditional blend'],
    },
  ];

  merchandise: Product[] = [
    {
      id: 'tshirt-1',
      name: 'Islamic Calligraphy T-Shirt',
      description: 'Premium cotton t-shirt with beautiful Arabic calligraphy.',
      price: 7500,
      category: 'merch',
      images: ['assets/images/tshirt-1a.jpg', 'assets/images/tshirt-1b.jpg'],
      stock: 100,
      sku: 'TSH001',
      features: ['100% Cotton', 'Multiple sizes', 'High-quality print'],
    },
    {
      id: 'cap-1',
      name: 'Islamic Cap',
      description: 'Comfortable and stylish cap with Islamic design.',
      price: 5000,
      category: 'merch',
      images: ['assets/images/cap-1a.jpg', 'assets/images/cap-1b.jpg'],
      stock: 75,
      sku: 'CAP001',
      features: ['Adjustable size', 'Breathable material', 'Elegant design'],
    },
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart({
      productId: product.id,
      productType: 'product',
      quantity: 1,
      price: product.price,
    });
  }
}

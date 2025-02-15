import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { CartService } from '../../core/services/cart.service';
import { Book } from '../../core/models/interfaces';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-books',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Islamic Books</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Islamic Literature</h1>
      <p>Discover our collection of Islamic books and publications</p>

      <div class="books-grid">
        @for (book of books; track book.id) {
        <ion-card>
          <img [src]="book.coverImage" [alt]="book.title" />
          <ion-card-header>
            <ion-badge color="primary" *ngIf="book.isDigital"
              >Digital</ion-badge
            >
            <ion-card-title>{{ book.title }}</ion-card-title>
            <p class="author">By {{ book.author }}</p>
          </ion-card-header>
          <ion-card-content>
            <p>{{ book.description }}</p>
            <p class="price">₦{{ book.price.toLocaleString() }}</p>
            <ion-button expand="block" (click)="addToCart(book)">
              Add to Cart
              <ion-icon name="cart" slot="end"></ion-icon>
            </ion-button>
          </ion-card-content>
        </ion-card>
        }
      </div>
    </ion-content>
  `,
  styles: [
    `
      .books-grid {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      ion-card {
        margin: 0;
      }

      ion-card img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }

      .author {
        color: var(--ion-color-medium);
        margin: 0.5rem 0;
      }

      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--ion-color-primary);
        margin: 1rem 0;
      }

      ion-badge {
        margin-bottom: 0.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
  ],
})
export class BooksComponent {
  books: Book[] = [
    {
      id: 'coming-soon',
      title: 'Upcoming Book',
      description:
        'Pre-order our upcoming publication. More details coming soon.',
      price: 5000,
      coverImage: 'assets/images/book-placeholder.jpg',
      author: 'Abdullah',
      publishDate: Timestamp.fromDate(new Date('2024-12-31')),
      isDigital: false,
    },
  ];

  constructor(private cartService: CartService) {}

  addToCart(book: Book) {
    this.cartService.addToCart({
      productId: book.id!,
      productType: 'book',
      quantity: 1,
      price: book.price,
    });
  }
}

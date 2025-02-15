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
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonInput,
} from '@ionic/angular/standalone';
import { CartService } from '../../core/services/cart.service';
import { PaymentService } from '../../core/services/payment.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OrderItem, Order } from '../../core/models/interfaces';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Shopping Cart</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      @if (items.length === 0) {
      <div class="empty-cart">
        <ion-icon name="cart-outline" size="large"></ion-icon>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart to proceed with checkout</p>
        <ion-button routerLink="/">Continue Shopping</ion-button>
      </div>
      } @else {
      <ion-list>
        @for (item of items; track item.productId) {
        <ion-item>
          <ion-label>
            <h2>{{ getItemName(item) }}</h2>
            <p>₦{{ item.price.toLocaleString() }} each</p>
          </ion-label>
          <div slot="end" class="item-controls">
            <ion-button
              fill="clear"
              size="small"
              (click)="updateQuantity(item, -1)"
            >
              <ion-icon name="remove-circle-outline"></ion-icon>
            </ion-button>
            <ion-input
              type="number"
              [value]="item.quantity"
              (ionChange)="onQuantityChange(item, $event)"
            ></ion-input>
            <ion-button
              fill="clear"
              size="small"
              (click)="updateQuantity(item, 1)"
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </ion-button>
            <ion-button fill="clear" color="danger" (click)="removeItem(item)">
              <ion-icon name="trash-outline"></ion-icon>
            </ion-button>
          </div>
        </ion-item>
        }
      </ion-list>

      <ion-card class="summary-card">
        <ion-card-header>
          <ion-card-title>Order Summary</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="summary-item">
            <span>Subtotal</span>
            <span>₦{{ getSubtotal().toLocaleString() }}</span>
          </div>
          <div class="summary-item total">
            <span>Total</span>
            <span>₦{{ getTotal().toLocaleString() }}</span>
          </div>

          <ion-button
            expand="block"
            (click)="checkout()"
            [disabled]="isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Proceed to Checkout' }}
          </ion-button>
        </ion-card-content>
      </ion-card>
      }
    </ion-content>
  `,
  styles: [
    `
      .empty-cart {
        text-align: center;
        padding: 2rem;
        color: var(--ion-color-medium);
      }

      .empty-cart ion-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .item-controls ion-input {
        width: 60px;
        text-align: center;
        --padding-start: 0;
        --padding-end: 0;
      }

      .summary-card {
        margin-top: 1rem;
      }

      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      .total {
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--ion-color-light);
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonInput,
  ],
})
export class CartComponent implements OnInit {
  items: OrderItem[] = [];
  isProcessing = false;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.items = items;
    });
  }

  getItemName(item: OrderItem): string {
    // TODO: Implement item name lookup from Firestore
    return `${
      item.productType.charAt(0).toUpperCase() + item.productType.slice(1)
    } #${item.productId}`;
  }

  onQuantityChange(item: OrderItem, event: any) {
    const newValue = event.detail.value;
    if (newValue && !isNaN(newValue)) {
      const change = Number(newValue) - item.quantity;
      this.updateQuantity(item, change);
    }
  }

  updateQuantity(item: OrderItem, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(
        item.productId,
        item.productType,
        newQuantity
      );
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: OrderItem) {
    this.cartService.removeFromCart(item.productId, item.productType);
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotal(): number {
    return this.getSubtotal(); // Add shipping, tax, etc. if needed
  }

  async checkout() {
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isProcessing = true;
    try {
      const now = Timestamp.now();
      const order: Order = {
        userId: user.uid,
        items: this.items,
        total: this.getTotal(),
        status: 'pending',
        createdAt: now,
        updatedAt: now,
        paymentStatus: 'pending',
        paymentMethod: 'paystack', // Default payment method
        shippingAddress: undefined, // Will be collected during checkout
      };

      const orderId = await this.paymentService.createOrder(order);
      await this.paymentService.initializePayment(
        { ...order, id: orderId },
        user.email!
      );

      // Clear cart after successful payment
      this.cartService.clearCart();
      this.router.navigate(['/account']);
    } catch (error: any) {
      console.error('Checkout error:', error);
      // TODO: Show error message to user
    } finally {
      this.isProcessing = false;
    }
  }
}

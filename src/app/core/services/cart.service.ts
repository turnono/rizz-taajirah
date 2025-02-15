import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItem } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'taajirah_cart';
  private cartItems = new BehaviorSubject<OrderItem[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveCart(items: OrderItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    this.cartItems.next(items);
  }

  getCartItems(): Observable<OrderItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: OrderItem): void {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(
      (i) =>
        i.productId === item.productId && i.productType === item.productType
    );

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.saveCart(currentItems);
  }

  removeFromCart(productId: string, productType: string): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(
      (item) =>
        !(item.productId === productId && item.productType === productType)
    );
    this.saveCart(updatedItems);
  }

  updateQuantity(
    productId: string,
    productType: string,
    quantity: number
  ): void {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(
      (item) => item.productId === productId && item.productType === productType
    );

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = quantity;
      this.saveCart(currentItems);
    }
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getItemCount(): number {
    return this.cartItems.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}

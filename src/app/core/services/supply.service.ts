import { Injectable, inject } from '@angular/core';
import { SupplyProduct } from '../models/interfaces';
import { Observable, from } from 'rxjs';
import { FirebaseBaseService } from './firebase-base.service';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends FirebaseBaseService {
  private firestoreInstance = inject(Firestore);

  constructor() {
    super(inject(Firestore));
  }

  /**
   * Returns the entire catalog from Firestore.
   */
  getCatalog(): Observable<SupplyProduct[]> {
    return this.getList<SupplyProduct>('supply-products');
  }

  /**
   * Filters products by category from Firestore.
   */
  getProductsByCategory(category: 'office' | 'packaging' | 'tech' | 'cleaning'): Observable<SupplyProduct[]> {
    return this.queryCollection<SupplyProduct>('supply-products', 'category', '==', category);
  }

  /**
   * Generates a WhatsApp message link for an order.
   */
  generateWhatsAppLink(items: {product: SupplyProduct, quantity: number}[]): string {
    const phone = '27720000000'; // Replace with actual number
    let message = 'Checking availablity for the following items:\n\n';
    
    let total = 0;
    items.forEach(item => {
      const lineTotal = item.product.price * item.quantity;
      total += lineTotal;
      message += `• ${item.quantity}x ${item.product.name} (R${item.product.price})\n`;
    });

    message += `\nTotal Est: R${total}\n`;
    message += `\nPlease confirm stock and delivery time.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
}

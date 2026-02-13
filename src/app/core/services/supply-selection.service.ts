import { Injectable, computed, signal } from '@angular/core';
import { SupplyProduct } from '../models/interfaces';

export interface SelectionItem {
  product: SupplyProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupplySelectionService {
  // State: Map of productId -> SelectionItem
  private selectionMap = signal<Map<string, SelectionItem>>(new Map());

  // Computed signals for UI
  readonly count = computed(() => {
    let total = 0;
    for (const item of this.selectionMap().values()) {
      total += item.quantity;
    }
    return total;
  });

  readonly items = computed(() => Array.from(this.selectionMap().values()));

  readonly isEmpty = computed(() => this.count() === 0);

  constructor() {}

  /**
   * Increment quantity for a product
   */
  add(product: SupplyProduct) {
    this.updateQuantity(product, 1);
  }

  /**
   * Decrement quantity for a product
   */
  remove(product: SupplyProduct) {
    this.updateQuantity(product, -1);
  }

  /**
   * Get current quantity for a specific product ID
   */
  getQuantity(productId: string): number {
    return this.selectionMap().get(productId)?.quantity || 0;
  }

  /**
   * Internal helper to update map immutably
   */
  private updateQuantity(product: SupplyProduct, delta: number) {
    const currentMap = new Map(this.selectionMap());
    const existing = currentMap.get(product.id);
    
    let newQuantity = (existing?.quantity || 0) + delta;

    if (newQuantity <= 0) {
      currentMap.delete(product.id);
    } else {
      currentMap.set(product.id, { product, quantity: newQuantity });
    }

    this.selectionMap.set(currentMap);
  }

  /**
   * Clear all selections
   */
  clear() {
    this.selectionMap.set(new Map());
  }

  /**
   * Generates the WhatsApp deep link
   */
  getWhatsAppLink(): string {
    const items = this.items();
    if (items.length === 0) return '';

    const phone = '27720000000'; // Configurable
    
    // Header
    let text = `*Taajirah Supply – Delivery Request*\n\n`;
    text += `Business name: __________________\n\n`;
    text += `*Items requested:*\n`;

    // Items
    items.forEach(item => {
      text += `• ${item.product.name} – Qty: ${item.quantity}\n`;
    });

    // Footer
    text += `\n*Please reply with:*\n`;
    text += `• Delivery address\n`;
    text += `• Contact person & phone\n`;
    text += `• Preferred delivery time today\n\n`;
    text += `Thank you,\nTaajirah Supply`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
}

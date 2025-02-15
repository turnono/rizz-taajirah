import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, from } from 'rxjs';
import { FirebaseBaseService } from './firebase-base.service';
import { Order } from '../models/interfaces';
import { Firestore } from '@angular/fire/firestore';

declare const PaystackPop: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends FirebaseBaseService {
  private readonly ORDERS_COLLECTION = 'orders';

  constructor(
    @Inject(Firestore) firestore: Firestore,
    private http: HttpClient
  ) {
    super(firestore);
  }

  initializePayment(order: Order, email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const handler = PaystackPop.setup({
        key: environment.paystack.publicKey,
        email: email,
        amount: order.total * 100, // Convert to kobo
        currency: 'NGN',
        ref: `TJR-${new Date().getTime()}`,
        callback: (response: any) => {
          this.verifyPayment(response.reference).subscribe({
            next: (verificationResponse) => {
              if (verificationResponse.status) {
                this.updateOrderAfterPayment(
                  order.id!,
                  'paid',
                  response.reference
                );
                resolve();
              } else {
                reject(new Error('Payment verification failed'));
              }
            },
            error: (error) => reject(error),
          });
        },
        onClose: () => {
          reject(new Error('Payment window closed'));
        },
      });
      handler.openIframe();
    });
  }

  private verifyPayment(reference: string): Observable<any> {
    // This should be done through your backend
    const verificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    return this.http.get(verificationUrl, {
      headers: {
        Authorization: `Bearer ${environment.paystack.secretKey}`,
      },
    });
  }

  private updateOrderAfterPayment(
    orderId: string,
    status: 'paid' | 'failed',
    reference: string
  ) {
    return this.update(this.ORDERS_COLLECTION, orderId, {
      paymentStatus: status,
      paymentReference: reference,
      updatedAt: new Date(),
    });
  }

  createOrder(order: Order): Promise<string> {
    return this.create(this.ORDERS_COLLECTION, {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentStatus: 'pending',
    }).then((ref) => ref.id);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.getOne<Order>(this.ORDERS_COLLECTION, orderId);
  }

  getUserOrders(userId: string): Observable<Order[]> {
    return this.queryCollection<Order>(
      this.ORDERS_COLLECTION,
      'userId',
      '==',
      userId
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

export interface Lead {
  name: string;
  industry: string;
  painPoint: string;
  hardware: string;
  phone: string;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private firestore = inject(Firestore);
  private leadsCollection = collection(this.firestore, 'leads');

  async addLead(data: Lead) {
    return addDoc(this.leadsCollection, {
      ...data,
      createdAt: serverTimestamp()
    });
  }
}

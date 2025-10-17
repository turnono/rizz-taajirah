import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';

export interface BusinessSignupData {
  businessName: string;
  email: string;
  businessType?: string;
  location?: string;
  description?: string;
  signupDate: any; // Firestore timestamp
  source: string; // Where they signed up from
  status: 'pending' | 'contacted' | 'onboarded';
}

@Injectable({
  providedIn: 'root',
})
export class HadiyaBusinessSignupService {
  private firestore = inject(Firestore);

  async submitBusinessSignup(
    signupData: Omit<BusinessSignupData, 'signupDate' | 'source' | 'status'>
  ): Promise<string> {
    try {
      console.log('Preparing business signup data:', signupData);

      const businessSignup: BusinessSignupData = {
        ...signupData,
        signupDate: serverTimestamp(),
        source: 'taajirah_landing_page',
        status: 'pending',
      };

      console.log('Saving to Firestore collection: hadiyaBusinessSignups');
      const docRef = await addDoc(
        collection(this.firestore, 'hadiyaBusinessSignups'),
        businessSignup
      );

      console.log(
        'Business signup saved to Taajirah project (hadiyaBusinessSignups collection) with ID:',
        docRef.id
      );
      return docRef.id;
    } catch (error) {
      console.error('Error saving business signup to Hadiya project:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        signupData,
      });
      throw error;
    }
  }

  async getBusinessSignups(): Promise<BusinessSignupData[]> {
    // This method can be used later for admin purposes
    // For now, we'll just return an empty array
    return [];
  }

  async updateBusinessSignupStatus(
    signupId: string,
    status: 'pending' | 'contacted' | 'onboarded'
  ): Promise<void> {
    // This method can be used later for admin purposes
    console.log(`Updating business signup ${signupId} status to ${status}`);
  }
}

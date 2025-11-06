import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  connectFirestoreEmulator,
  initializeFirestore,
  getFirestore,
} from '@angular/fire/firestore';
import { initializeApp, getApps, FirebaseApp } from '@angular/fire/app';
import { hadiyaFirebaseConfig } from '../../../environments/hadiya-firebase.config';

export interface BusinessSignupData {
  businessName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  websiteOrSocial?: string;
  contentCreatorInterest?: boolean;
  signupDate: any; // Firestore timestamp
  source: string; // Where they signed up from
  status: 'pending' | 'contacted' | 'onboarded';
}

export interface VendorApplication {
  name: string;
  businessName: string;
  contact: string; // email or phone
  category?: string;
  city?: string;
  products?: string;
  submissionDate: any; // Firestore timestamp
}

@Injectable({
  providedIn: 'root',
})
export class HadiyaBusinessSignupService {
  private firestore = inject(Firestore);
  private hadiyaFirestore: Firestore | null = null;

  private getHadiyaFirestore(): Firestore {
    if (!this.hadiyaFirestore) {
      // Initialize the Hadiya Firebase app if it doesn't exist
      let hadiyaApp: FirebaseApp;
      const existingApps = getApps();
      const hadiyaAppExists = existingApps.find((app) => app.name === 'hadiya');

      if (hadiyaAppExists) {
        hadiyaApp = hadiyaAppExists;
      } else {
        hadiyaApp = initializeApp(hadiyaFirebaseConfig, 'hadiya');
      }

      // Initialize Firestore for the Hadiya project
      this.hadiyaFirestore = getFirestore(hadiyaApp);
    }

    return this.hadiyaFirestore;
  }

  async submitBusinessSignup(
    signupData: Omit<BusinessSignupData, 'signupDate' | 'source' | 'status'>
  ): Promise<string> {
    try {
      console.log(
        'Preparing business signup data for Hadiya project:',
        signupData
      );

      const businessSignup: BusinessSignupData = {
        ...signupData,
        signupDate: serverTimestamp(),
        source: 'taajirah_landing_page',
        status: 'pending',
      };

      // Get the Hadiya Firestore instance
      const hadiyaFirestore = this.getHadiyaFirestore();

      console.log('Saving to Hadiya Firestore collection: businesses');
      const docRef = await addDoc(
        collection(hadiyaFirestore, 'businesses'),
        businessSignup
      );

      console.log(
        'Business signup saved to Hadiya project (tjr-gift) with ID:',
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

  async submitVendorApplication(
    data: Omit<VendorApplication, 'submissionDate'>
  ): Promise<string> {
    try {
      const hadiyaFirestore = this.getHadiyaFirestore();
      const payload: VendorApplication = {
        ...data,
        submissionDate: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(hadiyaFirestore, 'vendorApplications'),
        payload
      );
      return docRef.id;
    } catch (error) {
      console.error('Error saving vendor application:', error);
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

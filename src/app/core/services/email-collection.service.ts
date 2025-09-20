import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmailCollectionService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly NOTEBOOK_URL =
    'https://notebooklm.google.com/notebook/1d9d16c6-a52c-4fb3-a7ac-26e14606b3ad'; // Google Notebook LM URL

  constructor(private firestore: Firestore) {
    // Defer any Firestore network calls until explicitly requested
    // Consumers can call checkStoredUser() or createAnonymousUserIfNeeded()
  }

  /**
   * Check if we have a stored user in sessionStorage
   */
  private checkStoredUser() {
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // If we have a user ID, fetch the latest data from Firestore
      this.getUserById(storedUserId).then((user) => {
        if (user) {
          this.currentUserSubject.next(user);
        }
      });
    }
  }

  /**
   * Create an anonymous user in Firestore if one doesn't exist in session storage
   */
  async createAnonymousUserIfNeeded(): Promise<string> {
    // Check if we already have a user ID in session
    const storedUserId = sessionStorage.getItem('userId');

    if (storedUserId) {
      // User exists, retrieve from Firestore and update last access
      const user = await this.getUserById(storedUserId);
      if (user) {
        this.currentUserSubject.next(user);
        this.updateLastAccess(storedUserId);
        return storedUserId;
      }
    }

    // No valid user found, create a new anonymous one
    return this.createAnonymousUser();
  }

  /**
   * Create a new anonymous user in Firestore
   */
  private async createAnonymousUser(): Promise<string> {
    try {
      // Generate a unique ID for the user
      const userId = this.generateUserId();

      // Create user document in Firestore
      const userData = {
        isAnonymous: true,
        createdAt: Timestamp.now(),
        lastAccess: Timestamp.now(),
      };

      await setDoc(doc(this.firestore, 'users', userId), userData);

      // Store in session storage
      sessionStorage.setItem('userId', userId);

      // Update the current user subject
      this.currentUserSubject.next({
        ...userData,
        id: userId,
      });

      return userId;
    } catch (error) {
      console.error('Error creating anonymous user:', error);
      throw error;
    }
  }

  /**
   * Update an anonymous user with an email
   */
  async updateUserWithEmail(userId: string, email: string): Promise<void> {
    try {
      // Check if another user with this email already exists
      const existingUser = await this.getUserByEmail(email);

      if (existingUser && existingUser.id !== userId) {
        // If there's a different user with this email, use that account instead
        sessionStorage.setItem('userId', existingUser.id);
        this.currentUserSubject.next(existingUser);

        // Update the existing user's last access
        await this.updateLastAccess(existingUser.id);

        // Handle the orphaned anonymous user if needed
        // (You might want to delete it or merge data in a production app)

        return;
      }

      // Update the current user with the email
      const userRef = doc(this.firestore, 'users', userId);

      await setDoc(
        userRef,
        {
          email,
          isAnonymous: false,
          lastAccess: Timestamp.now(),
        },
        { merge: true }
      );

      // Store email in session for convenience
      sessionStorage.setItem('userEmail', email);

      // Update the current user subject
      const updatedUser = await this.getUserById(userId);
      if (updatedUser) {
        this.currentUserSubject.next(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user with email:', error);
      throw error;
    }
  }

  /**
   * Get user by ID from Firestore
   */
  async getUserById(userId: string): Promise<any | null> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return null;
      }

      return {
        ...userSnap.data(),
        id: userSnap.id,
      };
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  /**
   * Find a user by email
   */
  async getUserByEmail(email: string): Promise<any | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const userDoc = querySnapshot.docs[0];
      return {
        ...userDoc.data(),
        id: userDoc.id,
      };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  /**
   * Check if the current user has an email
   */
  hasEmail(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.email;
  }

  /**
   * Get notebook URL for direct navigation
   */
  getNotebookUrl(): string {
    return this.NOTEBOOK_URL;
  }

  /**
   * Generate a simple unique user ID
   */
  private generateUserId(): string {
    return (
      'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9)
    );
  }

  /**
   * Update the last access time for a user
   */
  async updateLastAccess(userId: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await setDoc(userRef, { lastAccess: Timestamp.now() }, { merge: true });
    } catch (error) {
      console.error('Error updating last access:', error);
    }
  }

  /**
   * Clear the stored user data
   */
  logout(): void {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
    this.currentUserSubject.next(null);
  }

  /**
   * Check if a user is logged in (has at least anonymous account)
   */
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userId');
  }

  /**
   * Legacy method - save user email directly
   * @deprecated Use createAnonymousUserIfNeeded and updateUserWithEmail instead
   */
  async saveUserEmail(email: string, displayName?: string): Promise<string> {
    try {
      // First check if this email already exists
      const existingUser = await this.getUserByEmail(email);

      if (existingUser) {
        // User already exists, just store in session
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userId', existingUser.id);
        this.currentUserSubject.next(existingUser);
        return existingUser.id;
      }

      // Generate a unique ID for the user
      const userId = this.generateUserId();

      // Create user document in Firestore
      const userData = {
        email,
        displayName: displayName || email.split('@')[0],
        createdAt: Timestamp.now(),
        lastAccess: Timestamp.now(),
        isAnonymous: false,
      };

      await setDoc(doc(this.firestore, 'users', userId), userData);

      // Store in session storage
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userId', userId);

      // Update the current user subject
      this.currentUserSubject.next({
        ...userData,
        id: userId,
      });

      return userId;
    } catch (error) {
      console.error('Error saving user email:', error);
      throw error;
    }
  }
}

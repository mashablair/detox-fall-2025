import { Injectable, signal, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore: Firestore = inject(Firestore);

  // Use a signal for reactive user profile data
  userProfile = signal<UserProfile | null>(null);

  constructor(private authService: AuthService) {
    // Register callback to load/clear profile when auth state changes
    this.authService.onUserAuthStateChanged = async (user) => {
      if (user) {
        // User logged in - load their profile from Firestore
        await this.loadUserProfile(user.uid);
      } else {
        // User logged out - clear profile
        await this.clearUserProfile();
      }
    };
  }

  /**
   * Load user profile from Firestore
   * Called when user logs in or when app initializes
   */
  async loadUserProfile(userId?: string): Promise<void> {
    const uid = userId || this.authService.getCurrentUser()?.uid;

    if (!uid) {
      console.warn('No user ID available to load profile');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, 'userProfiles', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const profile = userDoc.data() as UserProfile;
        this.userProfile.set(profile);
      } else {
        console.log('No profile found in Firestore for user:', uid);
      }
    } catch (error) {
      console.error('Error loading user profile from Firestore:', error);
    }
  }

  /**
   * Save user profile to Firestore
   * @param profile - The user profile to save
   * @param userId - Optional user ID (useful when saving immediately after signup)
   */
  async setUserProfile(profile: UserProfile, userId?: string): Promise<void> {
    const uid = userId || this.authService.getCurrentUser()?.uid;

    if (!uid) {
      console.error('No user ID available to save profile');
      throw new Error('User must be logged in to save profile');
    }

    try {
      const userDocRef = doc(this.firestore, 'userProfiles', uid);
      await setDoc(userDocRef, profile);
      this.userProfile.set(profile);
      console.log('Profile saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving user profile to Firestore:', error);
      throw error;
    }
  }

  getStartDate(): string | null {
    return this.userProfile()?.startDate ?? null;
  }

  /**
   * Clear user profile (used on logout)
   */
  async clearUserProfile(): Promise<void> {
    this.userProfile.set(null);
  }

  /**
   * Delete user profile from Firestore (for account deletion)
   */
  async deleteUserProfile(): Promise<void> {
    const uid = this.authService.getCurrentUser()?.uid;

    if (!uid) {
      console.error('No user ID available to delete profile');
      return;
    }

    try {
      const userDocRef = doc(this.firestore, 'userProfiles', uid);
      await deleteDoc(userDocRef);
      this.userProfile.set(null);
      console.log('Profile deleted from Firestore successfully');
    } catch (error) {
      console.error('Error deleting user profile from Firestore:', error);
      throw error;
    }
  }
}

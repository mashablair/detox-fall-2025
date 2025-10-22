import { Injectable, signal } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile.model';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_PROFILE_CACHE_KEY = 'detox_user_profile';

  // Use a signal for reactive user profile data
  userProfile = signal<UserProfile | null>(null);

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    // Register callback to load/clear profile when auth state changes
    this.authService.onUserAuthStateChanged = async (user) => {
      if (user) {
        // User logged in - load profile with cache strategy
        await this.loadUserProfileWithCache(user.uid);
      } else {
        // User logged out - clear profile
        await this.clearUserProfile();
      }
    };
  }

  /**
   * Load user profile with cache-first strategy
   * 1. Load from localStorage immediately (instant)
   * 2. Fetch from Firestore in background to verify/update
   */
  private async loadUserProfileWithCache(userId: string): Promise<void> {
    // Step 1: Load from localStorage immediately for instant display
    const cachedProfile = this.storageService.getItem<UserProfile>(this.USER_PROFILE_CACHE_KEY);
    if (cachedProfile) {
      this.userProfile.set(cachedProfile);
      console.log('Profile loaded from cache (instant)');
    }

    // Step 2: Fetch from Firestore in background to verify and update
    try {
      const userDocRef = doc(this.firestore, 'userProfiles', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const freshProfile = userDoc.data() as UserProfile;

        // Update cache and signal with fresh data
        this.storageService.setItem(this.USER_PROFILE_CACHE_KEY, freshProfile);
        this.userProfile.set(freshProfile);
        console.log('Profile updated from Firestore (background sync)');
      } else {
        console.log('No profile found in Firestore for user:', userId);
        // If no Firestore profile but we have cache, keep using cache
        if (!cachedProfile) {
          this.clearUserProfile();
        }
      }
    } catch (error) {
      console.error('Error loading user profile from Firestore:', error);
      // If Firestore fetch fails but we have cache, keep using cache
      if (!cachedProfile) {
        throw error;
      }
    }
  }

  /**
   * Load user profile from Firestore (without cache)
   * Used for explicit refresh operations
   * @deprecated Use loadUserProfileWithCache instead
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
        this.storageService.setItem(this.USER_PROFILE_CACHE_KEY, profile);
      } else {
        console.log('No profile found in Firestore for user:', uid);
      }
    } catch (error) {
      console.error('Error loading user profile from Firestore:', error);
    }
  }

  /**
   * Save user profile to Firestore and localStorage
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

      // Update both signal and cache
      this.userProfile.set(profile);
      this.storageService.setItem(this.USER_PROFILE_CACHE_KEY, profile);

      console.log('Profile saved to Firestore and cache successfully');
    } catch (error) {
      console.error('Error saving user profile to Firestore:', error);
      throw error;
    }
  }

  getStartDate(): string | null {
    return this.userProfile()?.startDate ?? null;
  }

  /**
   * Clear user profile from signal and localStorage (used on logout)
   */
  async clearUserProfile(): Promise<void> {
    this.userProfile.set(null);
    this.storageService.removeItem(this.USER_PROFILE_CACHE_KEY);
    console.log('Profile cleared from memory and cache');
  }

  /**
   * Delete user profile from Firestore and localStorage (for account deletion)
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

      // Clear signal and cache
      this.userProfile.set(null);
      this.storageService.removeItem(this.USER_PROFILE_CACHE_KEY);

      console.log('Profile deleted from Firestore and cache successfully');
    } catch (error) {
      console.error('Error deleting user profile from Firestore:', error);
      throw error;
    }
  }
}

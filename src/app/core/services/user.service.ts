import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { UserProfile } from '../models/user-profile.model';

const USER_PROFILE_KEY = 'gut-reset-user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Use a signal for reactive user profile data
  userProfile = signal<UserProfile | null>(null);

  constructor(private storageService: StorageService) {
    // Load the user profile from storage when the service is initialized
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const profile = this.storageService.getItem<UserProfile>(USER_PROFILE_KEY);
    if (profile) {
      this.userProfile.set(profile);
    }
  }

  setUserProfile(profile: UserProfile): void {
    this.storageService.setItem(USER_PROFILE_KEY, profile);
    this.userProfile.set(profile);
  }

  getStartDate(): string | null {
    return this.userProfile()?.startDate ?? null;
  }

  clearUserProfile(): void {
    this.storageService.removeItem(USER_PROFILE_KEY);
    this.userProfile.set(null);
  }
}

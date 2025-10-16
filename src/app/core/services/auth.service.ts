import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // Observable of the current user
  user$: Observable<User | null> = user(this.auth);

  // Signal for current user (for reactive templates)
  currentUser = signal<User | null>(null);

  constructor() {
    // Subscribe to auth state changes
    this.user$.subscribe((user) => {
      this.currentUser.set(user);
    });
  }

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  // Handle Firebase errors with user-friendly messages
  private handleError(error: any): string {
    let message = 'An error occurred. Please try again.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please sign in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Email/password accounts are not enabled. Please contact support.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid email or password.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
    }

    return message;
  }
}

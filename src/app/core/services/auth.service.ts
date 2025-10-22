import { Injectable, signal } from '@angular/core';
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
  // Observable of the current user
  user$: Observable<User | null>;

  // Signal for current user (for reactive templates)
  currentUser = signal<User | null>(null);

  // Callback to load user profile - will be set by UserService to avoid circular dependency
  onUserAuthStateChanged?: (user: User | null) => Promise<void>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    // Subscribe to auth state changes
    this.user$.subscribe(async (user) => {
      this.currentUser.set(user);

      // Load user profile when auth state changes
      if (this.onUserAuthStateChanged) {
        await this.onUserAuthStateChanged(user);
      }
    });
  }

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
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
      // Profile will be cleared via onUserAuthStateChanged callback
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
    let message = 'Произошла ошибка. Пожалуйста, попробуйте снова.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Этот адрес электронной почты уже зарегистрирован. Пожалуйста, войдите.';
        break;
      case 'auth/invalid-email':
        message = 'Пожалуйста, введите действительный адрес электронной почты.';
        break;
      case 'auth/operation-not-allowed':
        message =
          'Учетные записи по электронной почте/паролю не включены. Пожалуйста, свяжитесь с поддержкой.';
        break;
      case 'auth/weak-password':
        message = 'Пароль должен содержать минимум 6 символов.';
        break;
      case 'auth/user-disabled':
        message = 'Этот аккаунт был деактивирован.';
        break;
      case 'auth/user-not-found':
        message = 'Аккаунт с этим адресом электронной почты не найден.';
        break;
      case 'auth/wrong-password':
        message = 'Неверный пароль.';
        break;
      case 'auth/invalid-credential':
        message = 'Неверный адрес электронной почты или пароль.';
        break;
      case 'auth/too-many-requests':
        message = 'Слишком много неудачных попыток. Пожалуйста, попробуйте позже.';
        break;
    }

    return message;
  }
}

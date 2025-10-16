import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    // Validation
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage.set('Please fill in all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.authService.signUp(this.email, this.password);
      // After successful signup, navigate to onboarding to set start date
      this.router.navigate(['/onboarding']);
    } catch (error: any) {
      this.errorMessage.set(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

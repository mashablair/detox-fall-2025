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
      this.errorMessage.set('Пожалуйста, заполните все поля.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Пароли не совпадают.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('Пароль должен содержать минимум 6 символов.');
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

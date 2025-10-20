import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  country = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  async onSubmit() {
    // Validation
    if (
      !this.firstName ||
      !this.lastName ||
      !this.country ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
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
      // Sign up and get the created user
      const user = await this.authService.signUp(this.email, this.password);

      // Save initial user profile with all fields except startDate and products
      // Pass the user UID directly to avoid timing issues
      await this.userService.setUserProfile(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.country,
          email: this.email,
          startDate: '', // Will be set in onboarding
          products: [], // Will be set in onboarding
        },
        user.uid
      );

      // After successful signup, navigate to onboarding to set start date
      this.router.navigate(['/onboarding']);
    } catch (error: any) {
      this.errorMessage.set(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

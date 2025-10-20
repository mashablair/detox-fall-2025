import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from '../../core/models/user-profile.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styles: [],
})
export class EditProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  country = '';
  email = '';
  startDate = '';

  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Load current profile data
    const profile = this.userService.userProfile();
    if (profile) {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.country = profile.country;
      this.email = profile.email;
      this.startDate = profile.startDate;
    }

    console.log(this.email);
    console.log(this.userService.userProfile());
  }

  async onSubmit(): Promise<void> {
    // Validation (email is not required since it's disabled and can't be changed)
    if (!this.firstName || !this.lastName || !this.country || !this.startDate) {
      this.errorMessage.set('Пожалуйста, заполните все поля.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      // Get current profile to preserve products array
      const currentProfile = this.userService.userProfile();

      const updatedProfile: UserProfile = {
        firstName: this.firstName,
        lastName: this.lastName,
        country: this.country,
        email: this.email,
        startDate: this.startDate,
        products: currentProfile?.products || [], // Preserve existing products
      };

      await this.userService.setUserProfile(updatedProfile);
      this.successMessage.set('Профиль успешно обновлен!');

      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    } catch (error: any) {
      this.errorMessage.set('Произошла ошибка при сохранении профиля.');
    } finally {
      this.isLoading.set(false);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}

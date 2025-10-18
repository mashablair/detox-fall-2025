import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './onboarding.component.html',
  styles: [],
})
export class OnboardingComponent {
  constructor(private userService: UserService, private router: Router) {}

  async saveStartDate(date: string): Promise<void> {
    if (!date) {
      // Here you could add some user feedback, like an alert or a message
      console.error('No date selected');
      return;
    }

    // Get existing profile and merge with startDate
    const existingProfile = this.userService.userProfile();
    if (existingProfile) {
      try {
        await this.userService.setUserProfile({
          ...existingProfile,
          startDate: date,
        });

        // After saving, navigate the user to the main dashboard
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Error saving start date:', error);
        // TODO: You could add error handling UI here
      }
    } else {
      console.error('No existing profile found');
      return;
    }
  }
}

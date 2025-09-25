import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.component.html',
  styles: [],
})
export class OnboardingComponent {
  constructor(private userService: UserService, private router: Router) {}

  saveStartDate(date: string): void {
    if (!date) {
      // Here you could add some user feedback, like an alert or a message
      console.error('No date selected');
      return;
    }

    this.userService.setUserProfile({ startDate: date });

    // After saving, navigate the user to the main dashboard
    // We will create the '/dashboard' route in a later step
    this.router.navigate(['/dashboard']);
  }
}

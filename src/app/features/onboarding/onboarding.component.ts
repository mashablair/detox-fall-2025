import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ProductsChecklistComponent } from './products-checklist.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductsChecklistComponent],
  templateUrl: './onboarding.component.html',
  styles: [],
})
export class OnboardingComponent {
  // Track current step
  currentStep = signal<number>(1);
  totalSteps = 2;

  // Store start date temporarily
  startDate = signal<string>('');

  constructor(private userService: UserService, private router: Router) {}

  /**
   * Save start date and move to step 2
   */
  async proceedToStep2(date: string): Promise<void> {
    if (!date) {
      console.error('No date selected');
      alert('Пожалуйста, выберите дату начала программы');
      return;
    }

    // Store date temporarily
    this.startDate.set(date);

    // Move to step 2
    this.currentStep.set(2);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Go back to previous step
   */
  goToPreviousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Complete onboarding and save all data
   */
  async completeOnboarding(): Promise<void> {
    const existingProfile = this.userService.userProfile();
    if (!existingProfile) {
      console.error('No existing profile found');
      return;
    }

    try {
      // Save start date to user profile
      await this.userService.setUserProfile({
        ...existingProfile,
        startDate: this.startDate(),
      });

      // TODO: In the future, we can save the product checklist state to Firestore
      // For now, the checklist is just for user awareness during onboarding

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  }
}

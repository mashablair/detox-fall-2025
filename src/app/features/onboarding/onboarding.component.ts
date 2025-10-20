import { Component, signal, viewChild } from '@angular/core';
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

  // Get reference to products checklist component
  productsChecklist = viewChild(ProductsChecklistComponent);

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
      // Get selected products from checklist component
      const checklist = this.productsChecklist();
      const selectedProducts = checklist ? checklist.getCheckedProductIds() : [];

      // Save start date and products to user profile
      await this.userService.setUserProfile({
        ...existingProfile,
        startDate: this.startDate(),
        products: selectedProducts,
      });

      console.log('Onboarding complete. Selected products:', selectedProducts);

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  }
}

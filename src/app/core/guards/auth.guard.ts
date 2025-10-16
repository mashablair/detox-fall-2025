import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // Check if user is authenticated with Firebase
  if (!authService.isAuthenticated()) {
    // If not authenticated, redirect to login
    return router.parseUrl('/login');
  }

  // Check if user has completed onboarding (has start date)
  if (!userService.getStartDate() && state.url !== '/onboarding') {
    // If authenticated but no start date, redirect to onboarding
    return router.parseUrl('/onboarding');
  }

  // User is authenticated and has completed onboarding
  return true;
};

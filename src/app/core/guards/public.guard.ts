import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // If user is authenticated and has completed onboarding
  if (authService.isAuthenticated() && userService.getStartDate()) {
    // Redirect to dashboard
    return router.parseUrl('/dashboard');
  }

  // Allow access to public routes (landing, login, signup)
  return true;
};

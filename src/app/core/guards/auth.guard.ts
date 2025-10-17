import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // Wait for Firebase auth state to be initialized
  // This ensures that on page refresh, we wait for Firebase to restore the session
  return authService.user$.pipe(
    take(1), // Take only the first emission (current auth state)
    map((user) => {
      // Check if user is authenticated with Firebase
      if (!user) {
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
    })
  );
};

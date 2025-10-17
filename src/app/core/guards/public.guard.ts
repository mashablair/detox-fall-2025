import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // Wait for Firebase auth state to be initialized
  // This ensures that on page refresh, we wait for Firebase to restore the session
  return authService.user$.pipe(
    take(1), // Take only the first emission (current auth state)
    map((user) => {
      // Landing page is accessible to everyone
      if (state.url === '/' || state.url === '') {
        return true;
      }

      // If user is authenticated and has completed onboarding
      // Redirect them from login/signup pages to dashboard
      if (user && userService.getStartDate()) {
        return router.parseUrl('/dashboard');
      }

      // Allow access to public routes (login, signup)
      return true;
    })
  );
};

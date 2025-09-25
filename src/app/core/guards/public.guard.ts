import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getStartDate()) {
    // If start date exists, redirect to dashboard
    return router.parseUrl('/dashboard');
  }

  // If no start date, allow access to the route (onboarding)
  return true;
};

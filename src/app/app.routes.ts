import { Routes } from '@angular/router';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DailyLogComponent } from './features/daily-log/daily-log.component';
import { ProgressComponent } from './features/progress/progress.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'log-daily',
    component: DailyLogComponent,
    canActivate: [authGuard],
  },
  {
    path: 'progress',
    component: ProgressComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' }, // Wildcard route
];

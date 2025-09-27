import { Routes } from '@angular/router';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DailyLogComponent } from './features/daily-log/daily-log.component';
import { ProgressComponent } from './features/progress/progress.component';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [publicGuard],
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

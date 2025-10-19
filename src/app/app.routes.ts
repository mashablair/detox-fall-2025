import { Routes } from '@angular/router';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { HomeComponent } from './features/home/home.component';
import { DailyLogComponent } from './features/daily-log/daily-log.component';
import { ProgressComponent } from './features/progress/progress.component';
import { EditProfileComponent } from './features/profile/edit-profile.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardShellComponent } from './layout/dashboard-shell/dashboard-shell.component';
import { NutritionGuideComponent } from './features/nutrition-guide/nutrition-guide.component';

export const routes: Routes = [
  // Public routes
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
  // Onboarding - separate from dashboard shell
  {
    path: 'onboarding',
    component: OnboardingComponent,
    canActivate: [authGuard],
  },
  // Authenticated routes with dashboard shell
  {
    path: '',
    component: DashboardShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'log-daily',
        component: DailyLogComponent,
      },
      {
        path: 'progress',
        component: ProgressComponent,
      },
      {
        path: 'nutrition-guide',
        component: NutritionGuideComponent,
      },
      {
        path: 'profile',
        component: EditProfileComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' }, // Wildcard route
];

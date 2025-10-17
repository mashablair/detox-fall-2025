import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './top-bar.component.html',
  styles: [],
})
export class TopBarComponent {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {}

  getUserInitials(): string {
    const profile = this.userService.userProfile();
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
    }
    const user = this.authService.getCurrentUser();
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  }

  getUserFullName(): string {
    const profile = this.userService.userProfile();
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName} ${profile.lastName}`;
    }
    return this.authService.getCurrentUser()?.email || 'Пользователь';
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}

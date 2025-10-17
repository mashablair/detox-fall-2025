import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './top-bar.component.html',
  styles: [],
})
export class TopBarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  getUserInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}

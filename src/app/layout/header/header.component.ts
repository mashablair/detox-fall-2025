import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}

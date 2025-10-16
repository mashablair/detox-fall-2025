import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'gut-reset-tracker';
  showHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Show header only on authenticated routes (dashboard, log-daily, progress)
        const authenticatedRoutes = ['/dashboard', '/log-daily', '/progress'];
        // Extract the path without hash fragments
        const path = event.urlAfterRedirects.split('#')[0];
        this.showHeader = authenticatedRoutes.some((route) => path.startsWith(route));
      });
  }
}

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
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide header on the landing page
        this.showHeader = event.urlAfterRedirects !== '/';
      });
  }
}

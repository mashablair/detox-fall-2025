import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  name: string;
  route: string;
  icon: string;
  current: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  navigation: NavItem[] = [
    {
      name: 'Главная',
      route: '/dashboard',
      icon: 'home.svg',
      current: true,
    },
    {
      name: 'Дневник',
      route: '/log-daily',
      icon: 'calendar.svg',
      current: false,
    },
    {
      name: 'Прогресс',
      route: '/progress',
      icon: 'chart-pie.svg',
      current: false,
    },
  ];
}

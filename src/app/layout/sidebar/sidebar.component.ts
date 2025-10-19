import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

interface NavItem {
  name: string;
  route: string;
  icon: string;
  current: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  navigation: NavItem[] = [
    {
      name: 'Главная',
      route: '/dashboard',
      icon: 'heroHome',
      current: true,
    },
    {
      name: 'Дневник',
      route: '/log-daily',
      icon: 'heroCalendar',
      current: false,
    },
    {
      name: 'Прогресс',
      route: '/progress',
      icon: 'heroChartPie',
      current: false,
    },
  ];
}

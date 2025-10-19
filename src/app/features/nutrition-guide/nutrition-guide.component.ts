import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { PRINCIPLES, FOODS, HYDRATION, PRACTICES } from '../../core/data/nutrition.data';

type TabId = 'principles' | 'foods' | 'hydration' | 'practices';

interface Tab {
  id: TabId;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-nutrition-guide',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './nutrition-guide.component.html',
  styles: [],
})
export class NutritionGuideComponent {
  activeTab = signal<TabId>('principles');

  tabs: Tab[] = [
    { id: 'principles', name: 'Принципы', icon: 'heroSparkles' },
    { id: 'foods', name: 'Продукты', icon: 'heroBeaker' },
    { id: 'hydration', name: 'Гидратация', icon: 'heroBeaker' },
    { id: 'practices', name: 'Практики', icon: 'heroLightBulb' },
  ];

  // Data from nutrition.data.ts
  principles = PRINCIPLES;
  foods = FOODS;
  hydration = HYDRATION;
  practices = PRACTICES;

  setActiveTab(tabId: TabId): void {
    this.activeTab.set(tabId);
  }
}

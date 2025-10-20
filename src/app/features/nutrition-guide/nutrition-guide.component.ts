import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import {
  PRINCIPLES,
  FOODS,
  HYDRATION,
  PRACTICES,
  YOUR_PLATE_FORMULA,
  SAMPLE_DAY,
} from '../../core/data/nutrition.data';

@Component({
  selector: 'app-nutrition-guide',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './nutrition-guide.component.html',
  styles: [],
})
export class NutritionGuideComponent {
  // Data from nutrition.data.ts
  principles = PRINCIPLES;
  foods = FOODS;
  hydration = HYDRATION;
  practices = PRACTICES;
  plateFormula = YOUR_PLATE_FORMULA;
  sampleDay = SAMPLE_DAY;
}

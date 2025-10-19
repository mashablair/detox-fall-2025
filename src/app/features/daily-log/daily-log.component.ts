import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ProtocolService } from '../../core/services/protocol.service';
import { DailyLogService } from '../../core/services/daily-log.service';
import { HABITS, TIPS } from '../../core/data/nutrition.data';
import { HabitDef, TipRule } from '../../core/models/nutrition.model';

@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './daily-log.component.html',
  styles: [],
})
export class DailyLogComponent implements OnInit {
  logForm: FormGroup;
  supplementsForToday: string[] = [];
  today = new Date().toISOString().split('T')[0];

  // Nutrition tracking
  dailyHabits: HabitDef[] = [];
  booleanHabits: HabitDef[] = [];
  counterHabits: HabitDef[] = [];
  contextualTips = signal<TipRule[]>([]);
  nutritionScore = signal<number>(0);

  constructor(
    private fb: FormBuilder,
    private protocolService: ProtocolService,
    private dailyLogService: DailyLogService,
    private router: Router
  ) {
    // Filter habits by period (daily only)
    this.dailyHabits = HABITS.filter((h) => h.period === 'daily');
    this.booleanHabits = this.dailyHabits.filter((h) => h.type === 'boolean');
    this.counterHabits = this.dailyHabits.filter((h) => h.type === 'counter');

    this.logForm = this.fb.group({
      date: [this.today],
      symptoms: this.fb.group({
        digestion: [3, Validators.required],
        bloating: [3, Validators.required],
        energy: [3, Validators.required],
        sleep: [3, Validators.required],
        skinEyePuffiness: [3, Validators.required],
      }),
      supplements: this.fb.group({}), // Will be populated dynamically
      habits: this.fb.group({}), // Will be populated dynamically for nutrition habits
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.supplementsForToday = this.protocolService.getSupplementsForDay(this.today);
    const supplementsGroup = this.logForm.get('supplements') as FormGroup;
    this.supplementsForToday.forEach((supplement) => {
      supplementsGroup.addControl(supplement, this.fb.control(false));
    });

    // Setup nutrition habits form controls
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    this.dailyHabits.forEach((habit) => {
      if (habit.type === 'boolean') {
        habitsGroup.addControl(habit.id, this.fb.control(false));
      } else if (habit.type === 'counter') {
        habitsGroup.addControl(habit.id, this.fb.control(0));
      }
    });

    // Check for existing log for today and patch the form
    const existingLog = this.dailyLogService.getLogForDate(this.today);
    if (existingLog) {
      this.logForm.patchValue(existingLog);
    }

    // Calculate initial score and tips
    this.updateNutritionInsights();

    // Subscribe to habit changes to update score and tips in real-time
    habitsGroup.valueChanges.subscribe(() => {
      this.updateNutritionInsights();
    });
  }

  onSubmit(): void {
    if (this.logForm.valid) {
      this.dailyLogService.saveLog(this.logForm.value);
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Calculate nutrition score based on completed habits
   * Score = sum of (weight * completion%) for all daily habits
   */
  calculateNutritionScore(): number {
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    const habitsValue = habitsGroup.value;
    let totalWeight = 0;
    let earnedWeight = 0;

    this.dailyHabits.forEach((habit) => {
      totalWeight += habit.weight;
      const value = habitsValue[habit.id];

      if (habit.type === 'boolean') {
        if (value === true) {
          earnedWeight += habit.weight;
        }
      } else if (habit.type === 'counter' && habit.target) {
        const progress = Math.min(value / habit.target, 1); // Cap at 100%
        earnedWeight += habit.weight * progress;
      }
    });

    return totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  }

  /**
   * Get contextual tips based on missing or incomplete habits
   */
  getContextualTips(): TipRule[] {
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    const habitsValue = habitsGroup.value;
    const relevantTips: TipRule[] = [];

    TIPS.forEach((tip) => {
      if (tip.trigger.kind === 'missingHabit') {
        const habitValue = habitsValue[tip.trigger.habitId];
        if (!habitValue || habitValue === false) {
          relevantTips.push(tip);
        }
      } else if (tip.trigger.kind === 'counterBelow') {
        const habitValue = habitsValue[tip.trigger.habitId] || 0;
        if (habitValue < tip.trigger.min) {
          relevantTips.push(tip);
        }
      }
    });

    // Return max 3 tips
    return relevantTips.slice(0, 3);
  }

  /**
   * Update nutrition score and contextual tips
   */
  updateNutritionInsights(): void {
    this.nutritionScore.set(this.calculateNutritionScore());
    this.contextualTips.set(this.getContextualTips());
  }

  /**
   * Increment counter habit
   */
  incrementCounter(habitId: string): void {
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    const control = habitsGroup.get(habitId);
    if (control) {
      control.setValue(control.value + 1);
    }
  }

  /**
   * Decrement counter habit
   */
  decrementCounter(habitId: string): void {
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    const control = habitsGroup.get(habitId);
    if (control && control.value > 0) {
      control.setValue(control.value - 1);
    }
  }

  /**
   * Get current value of a habit
   */
  getHabitValue(habitId: string): any {
    const habitsGroup = this.logForm.get('habits') as FormGroup;
    return habitsGroup.get(habitId)?.value || 0;
  }
}

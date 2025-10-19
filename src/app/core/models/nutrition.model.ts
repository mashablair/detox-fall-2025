export type HabitPeriod = 'daily' | 'weekly';
export type HabitType = 'boolean' | 'counter';

export interface NutritionPrinciple {
  id: string;
  title: string;
  bullets: string[];
}

export interface FoodGuideline {
  id: string;
  category: 'allow' | 'limit' | 'avoid';
  items: string[];
  notes?: string[];
}

export interface HydrationGuideline {
  id: string;
  items: string[];
}

export interface PracticeGuideline {
  id: string;
  items: string[];
}

export interface HabitDef {
  id: string;
  title: string;
  period: HabitPeriod;
  type: HabitType;
  target?: number; // for 'counter'
  weight: number; // scoring weight
}

export interface TipRule {
  id: string;
  text: string;
  // simple triggers for now
  trigger:
    | { kind: 'missingHabit'; habitId: string }
    | { kind: 'counterBelow'; habitId: string; min: number };
}

export interface MealLog {
  id: string;
  time: string; // ISO time
  tags: string[]; // e.g. ['protein','veggies','fiber','sugar','caffeine']
  notes?: string;
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  meals: MealLog[];
  habits: Record<string, boolean | number>;
}

export interface NutritionScore {
  date: string;
  dailyScore: number; // 0..100
  breakdown: Record<string, number>; // habitId -> partial score
}

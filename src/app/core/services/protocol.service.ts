import { Injectable, computed } from '@angular/core';
import { UserService } from './user.service';

// Using a simple enum for phases for type safety and clarity
export enum ProtocolPhase {
  Phase1 = 'Month 1 = Calm & Clear',
  Phase2 = 'Months 2-3 = Rebuild & Restore',
  Phase3 = 'Months 4-6 = Energize & Protect',
}

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  startDate = computed(() => this.userService.userProfile()?.startDate);

  constructor(private userService: UserService) {}

  /**
   * Calculates the difference in days between two dates.
   * @param date1 - The first date (YYYY-MM-DD).
   * @param date2 - The second date (YYYY-MM-DD).
   * @returns The number of days between the two dates.
   */
  private getDateDifferenceInDays(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Gets the current day number in the protocol for a given date.
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns The day number (1-90) or null if the start date is not set.
   */
  public getDayNumber(forDate: string = new Date().toISOString().split('T')[0]): number | null {
    const startDate = this.startDate();
    if (!startDate) {
      return null;
    }
    // Day 1 is the start date itself, so we add 1
    return this.getDateDifferenceInDays(startDate, forDate) + 1;
  }

  /**
   * Gets the current protocol phase for a given date.
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns The current ProtocolPhase or null.
   */
  public getPhase(forDate: string = new Date().toISOString().split('T')[0]): ProtocolPhase | null {
    const dayNumber = this.getDayNumber(forDate);
    if (dayNumber === null) return null;

    if (dayNumber <= 30) {
      // Month 1
      return ProtocolPhase.Phase1;
    } else if (dayNumber <= 90) {
      // Months 2-3
      // Placeholder for future phases
      return ProtocolPhase.Phase2;
    } else {
      // Handle days beyond 90 if necessary
      return null;
    }
  }

  /**
   * Gets the list of required supplements for a given date.
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns An array of supplement names.
   */
  public getSupplementsForDay(forDate: string = new Date().toISOString().split('T')[0]): string[] {
    const phase = this.getPhase(forDate);
    if (phase !== ProtocolPhase.Phase1) {
      // For now, we only have the schedule for Phase 1
      return [];
    }

    const dayNumber = this.getDayNumber(forDate);
    if (dayNumber === null) return [];

    // --- Phase 1 Supplement Logic ---
    const supplements: string[] = [
      'DigestZen',
      'Enzymes',
      'Probiotic',
      'Fiber',
      'Omega + VMG',
      'Turmeric',
      'Vitamin D',
    ];

    // GX Assist: 3 days on, 10 days off. This cycle repeats.
    // The total cycle length is 13 days.
    const dayInCycle = (dayNumber - 1) % 13;
    if (dayInCycle < 3) {
      // Day 0, 1, 2 of the cycle are "on" days (which are Days 1, 2, 3 of protocol)
      supplements.push('GX Assist');
    }

    // Zendocrine is used minimally until constipation improves.
    // For now, we can add it based on a simple rule, e.g., every other day.
    // This logic can be made more sophisticated later based on user input.
    if (dayNumber % 2 === 0) {
      supplements.push('Zendocrine');
    }

    return supplements;
  }
}

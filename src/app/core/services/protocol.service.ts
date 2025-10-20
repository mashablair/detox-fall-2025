import { Injectable, computed } from '@angular/core';
import { UserService } from './user.service';
import { ProtocolPhase, ProtocolSupplement, WeekSchedule } from '../models/protocol.model';
import { PROTOCOL_PHASES } from '../data/protocol-phases.data';
import { PROTOCOL_SCHEDULE, getScheduleForWeek } from '../data/protocol-schedule.data';

/**
 * ProtocolService
 * Manages the 4-week (30-day) detox protocol
 * Calculates current week/phase and provides supplement schedules
 */
@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  // Get user's start date from UserService
  startDate = computed(() => this.userService.userProfile()?.startDate);

  // Get user's selected products from UserService
  userProducts = computed(() => this.userService.userProfile()?.products || []);

  constructor(private userService: UserService) {}

  /**
   * Calculates the difference in days between two dates
   * @param date1 - The first date (YYYY-MM-DD)
   * @param date2 - The second date (YYYY-MM-DD)
   * @returns The number of days between the two dates
   */
  private getDateDifferenceInDays(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Gets the current day number in the protocol (1-30)
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns The day number (1-30) or null if start date is not set
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
   * Gets the current week number in the protocol (1-4)
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns The week number (1-4) or null
   */
  public getWeekNumber(forDate: string = new Date().toISOString().split('T')[0]): number | null {
    const dayNumber = this.getDayNumber(forDate);
    if (dayNumber === null) return null;

    // 30 days / 4 weeks ≈ 7-8 days per week
    // Week 1: Days 1-7
    // Week 2: Days 8-14
    // Week 3: Days 15-21
    // Week 4: Days 22-30
    if (dayNumber <= 7) return 1;
    if (dayNumber <= 14) return 2;
    if (dayNumber <= 21) return 3;
    if (dayNumber <= 30) return 4;

    // After day 30, program is complete
    return null;
  }

  /**
   * Gets the phase metadata for a specific week
   * @param week - Week number (1-4)
   * @returns ProtocolPhase or null
   */
  public getPhaseForWeek(week: number): ProtocolPhase | null {
    return PROTOCOL_PHASES.find((p) => p.week === week) || null;
  }

  /**
   * Gets the current phase metadata
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns ProtocolPhase or null
   */
  public getCurrentPhase(
    forDate: string = new Date().toISOString().split('T')[0]
  ): ProtocolPhase | null {
    const week = this.getWeekNumber(forDate);
    if (week === null) return null;
    return this.getPhaseForWeek(week);
  }

  /**
   * Gets the supplement schedule for a specific week
   * @param week - Week number (1-4)
   * @returns WeekSchedule or null
   */
  public getScheduleForWeek(week: number): WeekSchedule | null {
    return getScheduleForWeek(week) || null;
  }

  /**
   * Gets supplements for a specific day, filtered by user's products
   * Only returns supplements that the user has checked in onboarding
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns Array of ProtocolSupplement items the user has
   */
  public getSupplementsForDay(
    forDate: string = new Date().toISOString().split('T')[0]
  ): ProtocolSupplement[] {
    const week = this.getWeekNumber(forDate);
    if (week === null) return [];

    const schedule = this.getScheduleForWeek(week);
    if (!schedule || schedule.locked) return [];

    const userProducts = this.userProducts();

    // Filter supplements to only show ones the user has
    return schedule.supplements.filter((supplement) => userProducts.includes(supplement.productId));
  }

  /**
   * Gets supplements grouped by timing for a specific day
   * Only includes supplements the user has
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns Object with morning, lunch, and dinner arrays
   */
  public getSupplementsByTiming(forDate: string = new Date().toISOString().split('T')[0]): {
    morning: ProtocolSupplement[];
    lunch: ProtocolSupplement[];
    dinner: ProtocolSupplement[];
  } {
    const supplements = this.getSupplementsForDay(forDate);

    return {
      morning: supplements.filter((s) => s.timing === 'morning'),
      lunch: supplements.filter((s) => s.timing === 'lunch'),
      dinner: supplements.filter((s) => s.timing === 'dinner'),
    };
  }

  /**
   * Checks if the current week's schedule is locked (not yet available)
   * @param forDate - The date to check (YYYY-MM-DD). Defaults to today.
   * @returns true if locked, false if available
   */
  public isCurrentWeekLocked(forDate: string = new Date().toISOString().split('T')[0]): boolean {
    const week = this.getWeekNumber(forDate);
    if (week === null) return true;

    const schedule = this.getScheduleForWeek(week);
    return schedule?.locked || false;
  }

  /**
   * Gets all phase metadata
   * @returns Array of all ProtocolPhase objects
   */
  public getAllPhases(): ProtocolPhase[] {
    return PROTOCOL_PHASES;
  }
}

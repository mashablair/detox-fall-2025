import { WeekSchedule } from '../models/protocol.model';

/**
 * Weekly supplement schedules for the 4-week detox protocol
 * Week 1 is complete, weeks 2-4 are placeholders (locked)
 */
export const PROTOCOL_SCHEDULE: WeekSchedule[] = [
  // ========================================
  // WEEK 1: Complete Schedule
  // ========================================
  {
    week: 1,
    locked: false,
    supplements: [
      // Morning (Утро, с завтраком)
      {
        productId: 'vmg-plus',
        timing: 'morning',
        amount: '1 порция',
        notes: 'Смешать с водой',
      },
      {
        productId: 'eo-mega',
        timing: 'morning',
        amount: '1 капсула',
      },
      {
        productId: 'terrazyme',
        timing: 'morning',
        amount: '1 капсула',
        notes: 'Ферменты',
      },
      {
        productId: 'pb-restore',
        timing: 'morning',
        amount: '1 капсула',
        notes: 'Пробиотик',
      },

      // Lunch (Обед)
      {
        productId: 'terrazyme',
        timing: 'lunch',
        amount: '1 капсула',
        notes: 'Ферменты в начале еды',
      },
      {
        productId: 'eo-mega',
        timing: 'lunch',
        amount: '1 капсула',
      },

      // Dinner (Ужин)
      {
        productId: 'eo-mega',
        timing: 'dinner',
        amount: '1 капсула',
      },
      {
        productId: 'terrazyme',
        timing: 'dinner',
        amount: '1 капсула',
        notes: 'Ферменты',
      },
    ],
  },

  // ========================================
  // WEEK 2: Placeholder (Coming Soon)
  // ========================================
  {
    week: 2,
    locked: true,
    supplements: [
      // Will continue Week 1 supplements + add new ones
      // To be defined
    ],
  },

  // ========================================
  // WEEK 3: Placeholder (Coming Soon)
  // ========================================
  {
    week: 3,
    locked: true,
    supplements: [
      // Will continue previous weeks + add new ones
      // To be defined
    ],
  },

  // ========================================
  // WEEK 4: Placeholder (Coming Soon)
  // ========================================
  {
    week: 4,
    locked: true,
    supplements: [
      // Will continue previous weeks + add new ones
      // To be defined
    ],
  },
];

/**
 * Helper function to get schedule for a specific week
 */
export function getScheduleForWeek(week: number): WeekSchedule | undefined {
  return PROTOCOL_SCHEDULE.find((s) => s.week === week);
}

/**
 * Helper function to get all unlocked weeks
 */
export function getUnlockedWeeks(): WeekSchedule[] {
  return PROTOCOL_SCHEDULE.filter((s) => !s.locked);
}

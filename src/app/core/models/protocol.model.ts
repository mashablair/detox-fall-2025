/**
 * Protocol Models
 * Defines the structure for the 4-week (30-day) detox protocol
 */

export type SupplementTiming = 'morning' | 'lunch' | 'dinner';

/**
 * Individual supplement entry in the protocol schedule
 */
export interface ProtocolSupplement {
  productId: string; // Product ID from products.data.ts (e.g., 'vmg-plus')
  timing: SupplementTiming;
  amount: string; // Russian text: '1 порция', '1 капсула'
  notes?: string; // Additional instructions in Russian
}

/**
 * Weekly protocol schedule
 */
export interface WeekSchedule {
  week: number; // 1-4
  supplements: ProtocolSupplement[];
  locked?: boolean; // True if schedule is not yet available
}

/**
 * Phase metadata (one phase = one week)
 */
export interface ProtocolPhase {
  week: number; // 1-4
  title: string; // Russian title
  subtitle: string; // Russian subtitle/focus
  description: string; // Russian description
  webinarDate?: string; // Optional: webinar date for this phase
  topics?: string[]; // Key topics covered in Russian
}

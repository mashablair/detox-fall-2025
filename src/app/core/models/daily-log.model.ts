export interface DailyLog {
  date: string; // ISO 8601 format: YYYY-MM-DD
  symptoms: {
    digestion: number; // For BM type/frequency, maybe a 1-5 scale or something more detailed later
    bloating: number; // 1-5 scale
    energy: number; // 1-5 scale
    sleep: number; // 1-5 scale
    skinEyePuffiness: number; // 1-5 scale
  };
  supplements: {
    [supplementName: string]: boolean; // e.g., { 'DigestZen': true, 'Probiotic': false }
  };
  notes?: string;
}

import { Injectable, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';
import { DailyLog } from '../models/daily-log.model';

const DAILY_LOGS_KEY = 'gut-reset-daily-logs';

@Injectable({
  providedIn: 'root',
})
export class DailyLogService {
  private logs = signal<DailyLog[]>([]);

  constructor(private storageService: StorageService) {
    this.loadLogs();
  }

  private loadLogs(): void {
    const logs = this.storageService.getItem<DailyLog[]>(DAILY_LOGS_KEY);
    this.logs.set(logs || []);
  }

  getLogForDate(date: string): DailyLog | undefined {
    return this.logs().find((log) => log.date === date);
  }

  saveLog(log: DailyLog): void {
    const existingLogs = this.logs();
    const existingLogIndex = existingLogs.findIndex((l) => l.date === log.date);

    let updatedLogs: DailyLog[];
    if (existingLogIndex > -1) {
      // Update existing log
      updatedLogs = [
        ...existingLogs.slice(0, existingLogIndex),
        log,
        ...existingLogs.slice(existingLogIndex + 1),
      ];
    } else {
      // Add new log
      updatedLogs = [...existingLogs, log];
    }

    this.storageService.setItem(DAILY_LOGS_KEY, updatedLogs);
    this.logs.set(updatedLogs);
  }
}

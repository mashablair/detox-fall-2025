import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { UserService } from '../../core/services/user.service';
import { ProtocolService } from '../../core/services/protocol.service';
import { DailyLogService } from '../../core/services/daily-log.service';
import { ProtocolPhase } from '../../core/models/protocol.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  // User data
  userFirstName = signal<string>('');

  // Protocol data
  currentDay = signal<number | null>(null);
  totalDays = 30; // 30-day detox program
  currentPhase = signal<string>('');

  // Stats
  daysCompleted = signal<number>(0);
  currentStreak = signal<number>(0);
  completionPercentage = computed(() => {
    const completed = this.daysCompleted();
    return Math.round((completed / this.totalDays) * 100);
  });

  constructor(
    private userService: UserService,
    private protocolService: ProtocolService,
    private dailyLogService: DailyLogService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadProtocolData();
    this.loadStats();
  }

  /**
   * Load user profile data
   */
  private loadUserData(): void {
    const profile = this.userService.userProfile();
    if (profile?.firstName) {
      this.userFirstName.set(profile.firstName);
    }
  }

  /**
   * Load protocol day and phase information
   */
  private loadProtocolData(): void {
    const today = new Date().toISOString().split('T')[0];

    // Get current day number
    const dayNumber = this.protocolService.getDayNumber(today);
    this.currentDay.set(dayNumber);

    // Get current phase (which now includes Russian title)
    const phase = this.protocolService.getCurrentPhase(today);
    if (phase) {
      this.currentPhase.set(`Неделя ${phase.week}: ${phase.subtitle}`);
    } else {
      this.currentPhase.set('');
    }
  }

  /**
   * Load statistics from daily logs
   */
  private loadStats(): void {
    const logs = this.dailyLogService.getAllLogs();

    // Days completed = number of logs
    this.daysCompleted.set(logs.length);

    // Calculate current streak
    this.currentStreak.set(this.calculateStreak(logs));
  }

  /**
   * Calculate the current streak of consecutive days logged
   */
  private calculateStreak(logs: any[]): number {
    if (logs.length === 0) return 0;

    // Sort logs by date descending
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date);
      logDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (logDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get progress bar width percentage
   */
  getProgressWidth(): string {
    if (!this.currentDay()) return '0%';
    const percentage = ((this.currentDay() || 0) / this.totalDays) * 100;
    return `${Math.min(percentage, 100)}%`;
  }

  /**
   * Get motivational message based on progress
   */
  getMotivationalMessage(): string {
    const day = this.currentDay();
    if (!day) return 'Добро пожаловать! Начните свой путь к здоровью.';

    if (day <= 7) {
      return 'Отличное начало! Первая неделя — самая важная.';
    } else if (day <= 14) {
      return 'Вы на правильном пути! Продолжайте в том же духе.';
    } else if (day <= 21) {
      return 'Потрясающе! Вы уже прошли больше половины пути.';
    } else if (day < 30) {
      return 'Почти у цели! Последний рывок к успеху.';
    } else {
      return 'Поздравляем! Вы завершили 30-дневную программу!';
    }
  }
}

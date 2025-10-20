import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from 'chart.js';
import { DailyLogService } from '../../core/services/daily-log.service';
import { DailyLog } from '../../core/models/daily-log.model';

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterLink],
  templateUrl: './progress.component.html',
  styles: [],
})
export class ProgressComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartType: ChartType = 'line';

  constructor(private dailyLogService: DailyLogService) {}

  ngOnInit(): void {
    const logs = this.dailyLogService.getAllLogs(); // We need to add this method to the service
    this.prepareChartData(logs);
  }

  private prepareChartData(logs: DailyLog[]): void {
    if (!logs || logs.length === 0) {
      return;
    }

    // Sort logs by date just in case they are not in order
    logs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const labels = logs.map((log) => log.date);
    const bloatingData = logs.map((log) => log.symptoms.bloating);
    const energyData = logs.map((log) => log.symptoms.energy);
    // ... add other symptoms similarly

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: bloatingData,
          label: 'Bloating',
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
        {
          data: energyData,
          label: 'Energy',
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
        },
      ],
    };
  }
}

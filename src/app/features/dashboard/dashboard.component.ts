import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProtocolService, ProtocolPhase } from '../../core/services/protocol.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html', // We will create this file next
  styleUrls: ['./dashboard.component.scss'], // We will create this file next
})
export class DashboardComponent implements OnInit {
  dayNumber = signal<number | null>(null);
  phase = signal<ProtocolPhase | null>(null);
  supplements = signal<string[]>([]);

  constructor(private protocolService: ProtocolService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.dayNumber.set(this.protocolService.getDayNumber(today));
    this.phase.set(this.protocolService.getPhase(today));
    this.supplements.set(this.protocolService.getSupplementsForDay(today));
  }
}

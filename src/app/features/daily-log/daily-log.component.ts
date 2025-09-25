import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProtocolService } from '../../core/services/protocol.service';
import { DailyLogService } from '../../core/services/daily-log.service';

@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss'],
})
export class DailyLogComponent implements OnInit {
  logForm: FormGroup;
  supplementsForToday: string[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private protocolService: ProtocolService,
    private dailyLogService: DailyLogService,
    private router: Router
  ) {
    this.logForm = this.fb.group({
      date: [this.today],
      symptoms: this.fb.group({
        digestion: [3, Validators.required],
        bloating: [3, Validators.required],
        energy: [3, Validators.required],
        sleep: [3, Validators.required],
        skinEyePuffiness: [3, Validators.required],
      }),
      supplements: this.fb.group({}), // Will be populated dynamically
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.supplementsForToday = this.protocolService.getSupplementsForDay(this.today);
    const supplementsGroup = this.logForm.get('supplements') as FormGroup;
    this.supplementsForToday.forEach((supplement) => {
      supplementsGroup.addControl(supplement, this.fb.control(false));
    });

    // Check for existing log for today and patch the form
    const existingLog = this.dailyLogService.getLogForDate(this.today);
    if (existingLog) {
      this.logForm.patchValue(existingLog);
    }
  }

  onSubmit(): void {
    if (this.logForm.valid) {
      this.dailyLogService.saveLog(this.logForm.value);
      this.router.navigate(['/dashboard']);
    }
  }
}

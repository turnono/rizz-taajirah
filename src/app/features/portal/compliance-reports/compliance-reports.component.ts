import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalService } from '../services/portal.service';

@Component({
  selector: 'app-compliance-reports',
  standalone: true,
  imports: [CommonModule],
  providers: [PortalService],
  templateUrl: './compliance-reports.component.html',
  styleUrls: ['./compliance-reports.component.scss']
})
export class ComplianceReportsComponent implements OnInit {
  private portalService = inject(PortalService);
  reports = this.portalService.reports;
  loading = this.portalService.loadingReports;
  generating = false;

  ngOnInit() {
    this.portalService.fetchReports().subscribe();
  }

  generateNewReport() {
    this.generating = true;
    this.portalService.generateReport().subscribe({
      next: () => this.generating = false,
      error: () => this.generating = false
    });
  }

  formatDate(isoString: string): string {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalService } from '../services/portal.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PortalService],
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  private portalService = inject(PortalService);
  logs = this.portalService.logs;
  loading = this.portalService.loadingLogs;

  ngOnInit() {
    this.portalService.fetchLogs().subscribe();
  }

  refreshLogs() {
    this.portalService.fetchLogs().subscribe();
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogsComponent } from '../audit-logs/audit-logs.component';
import { ComplianceReportsComponent } from '../compliance-reports/compliance-reports.component';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-dashboard',
  standalone: true,
  imports: [CommonModule, AuditLogsComponent, ComplianceReportsComponent],
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.scss']
})
export class PortalDashboardComponent {
  activeTab: 'logs' | 'reports' = 'logs';
  private auth = inject(Auth);
  private router = inject(Router);

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/portal/login']);
  }
}

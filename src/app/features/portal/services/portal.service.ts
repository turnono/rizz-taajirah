import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuditEvent {
  id?: string;
  command: string;
  allowed: boolean;
  risk_score: number;
  reason: string;
  returncode: number | null;
  timestamp?: string;
}

export interface ComplianceReport {
  id: string;
  generated_at: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private firestore: Firestore = inject(Firestore);

  // State
  logs = signal<AuditEvent[]>([]);
  reports = signal<ComplianceReport[]>([]);
  loadingLogs = signal(false);
  loadingReports = signal(false);

  fetchLogs(): Observable<AuditEvent[]> {
    this.loadingLogs.set(true);
    // Fetch latest 100 audit logs from Firestore
    const logsRef = collection(this.firestore, 'AuditLogs');
    const logsQuery = query(logsRef, orderBy('timestamp', 'desc'), limit(100));
    
    const logs$ = collectionData(logsQuery, { idField: 'id' }) as Observable<AuditEvent[]>;
    
    logs$.subscribe({
      next: (data) => {
        this.logs.set(data);
        this.loadingLogs.set(false);
      },
      error: (err) => {
        console.error('Firestore Error fetching logs:', err);
        this.loadingLogs.set(false);
      }
    });
    
    return logs$;
  }

  fetchReports(): Observable<ComplianceReport[]> {
    this.loadingReports.set(true);
    
    // Fetch Compliance Reports
    const reportsRef = collection(this.firestore, 'ComplianceReports');
    const reportsQuery = query(reportsRef, orderBy('generated_at', 'desc'), limit(50));
    
    // Use type mapping to assure exact structure if needed
    const reports$ = collectionData(reportsQuery, { idField: 'id' }) as Observable<any[]>;
    const typedReports$ = reports$.pipe(
      map(docs => docs.map(doc => ({
        id: doc.id,
        generated_at: doc.generated_at,
        status: doc.compliance_status
      } as ComplianceReport)))
    );

    typedReports$.subscribe({
      next: (data) => {
        this.reports.set(data);
        this.loadingReports.set(false);
      },
      error: (err) => {
        console.error('Firestore Error fetching reports:', err);
        this.loadingReports.set(false);
      }
    });

    return typedReports$;
  }

  generateReport(): Observable<any> {
    // In a truly serverless setup where the Python engine runs locally via cron,
    // we don't trigger the generation synchronously via HTTP. 
    // Instead, the UI simply fetches the latest data. 
    // A cloud function trigger could be implemented here later.
    console.warn("Manual generation is disabled. Reports are auto-generated via cron schedule.");
    return new Observable(subscriber => {
      setTimeout(() => subscriber.complete(), 500);
    });
  }
}

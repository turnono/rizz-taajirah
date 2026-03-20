import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LeadService } from '../../core/services/lead.service';

@Component({
  selector: 'app-discovery-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="discovery-container" [class.success]="submitted">
      <!-- Form State -->
      <ng-container *ngIf="!submitted">
        <div class="header">
          <h2 class="mono">SOVEREIGN DISCOVERY</h2>
          <p class="subtitle">Secure your enterprise AI strategy session.</p>
          <button mat-icon-button class="close-btn" (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <form [formGroup]="discoveryForm" (ngSubmit)="onSubmit()" class="discovery-form">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>FULL NAME</mat-label>
              <input matInput formControlName="name" placeholder="John Doe">
              <mat-error *ngIf="discoveryForm.get('name')?.hasError('required')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>INDUSTRY</mat-label>
              <mat-select formControlName="industry">
                <mat-option value="finance">Finance & Fintech</mat-option>
                <mat-option value="healthcare">Healthcare</mat-option>
                <mat-option value="legal">Legal & Compliance</mat-option>
                <mat-option value="retail">Retail & E-commerce</mat-option>
                <mat-option value="manufacturing">Manufacturing</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
              <mat-error *ngIf="discoveryForm.get('industry')?.hasError('required')">Industry is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>PRIMARY PAIN POINT</mat-label>
              <textarea matInput formControlName="painPoint" placeholder="Describe your core AI/Data challenges..." rows="3"></textarea>
              <mat-error *ngIf="discoveryForm.get('painPoint')?.hasError('required')">Pain point is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>CURRENT HARDWARE</mat-label>
              <input matInput formControlName="hardware" placeholder="e.g. NVIDIA RTX 4090, Mac M3 Max, Local Server...">
              <mat-error *ngIf="discoveryForm.get('hardware')?.hasError('required')">Hardware info is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>SOUTH AFRICAN PHONE</mat-label>
              <input matInput formControlName="phone" placeholder="082 123 4567 or +27...">
              <mat-icon matPrefix>phone</mat-icon>
              <mat-error *ngIf="discoveryForm.get('phone')?.hasError('required')">Phone is required</mat-error>
              <mat-error *ngIf="discoveryForm.get('phone')?.hasError('pattern')">Please enter a valid SA phone number</mat-error>
            </mat-form-field>
          </div>

          <div class="actions">
            <button mat-flat-button color="primary" class="submit-btn" [disabled]="discoveryForm.invalid || loading">
              <span *ngIf="!loading">INITIALIZE SESSION</span>
              <span *ngIf="loading">ENCRYPTING & SENDING...</span>
            </button>
          </div>
        </form>
      </ng-container>

      <!-- Success State -->
      <div *ngIf="submitted" class="success-state fade-in">
        <mat-icon class="success-icon">verified_user</mat-icon>
        <h2 class="mono">TRANSMISSION SECURED</h2>
        <p>Thank you. Your request for a Sovereign AI Strategy Session has been logged in our secure vault.</p>
        
        <div class="whatsapp-container">
          <p class="secondary-info">For immediate escalation, connect directly via WhatsApp:</p>
          <button mat-flat-button class="whatsapp-btn" (click)="openWhatsApp()">
            <mat-icon>chat</mat-icon>
            CONNECT WITH FOUNDER
          </button>
        </div>

        <button mat-stroked-button class="done-btn" (click)="close()">CLOSE VAULT</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #0A0A0A; color: #fff; }

    .discovery-container {
      padding: 3rem;
      max-width: 600px;
      position: relative;
      border: 1px solid rgba(118, 185, 0, 0.2);
      border-radius: 24px;
      overflow: hidden;
      background: radial-gradient(circle at top right, rgba(118, 185, 0, 0.05), transparent);
    }

    .discovery-container.success {
      text-align: center;
      padding: 5rem 3rem;
    }

    .header {
      margin-bottom: 2.5rem;
      position: relative;
    }

    h2 { font-size: 2rem; font-weight: 800; margin: 0; color: #76B900; letter-spacing: -0.5px; }
    .subtitle { color: #90A4AE; font-size: 1rem; margin-top: 0.5rem; }

    .close-btn { position: absolute; top: -1.5rem; right: -1.5rem; color: #90A4AE; }

    .discovery-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .full-width { width: 100%; }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: rgba(255, 255, 255, 0.03) !important;
    }

    ::ng-deep .mat-mdc-form-field-outline {
      border-color: rgba(255, 255, 255, 0.1) !important;
    }

    ::ng-deep .mat-mdc-form-field-focus-overlay {
      background-color: rgba(118, 185, 0, 0.05) !important;
    }

    .actions { margin-top: 2rem; }

    .submit-btn {
      width: 100%;
      height: 60px;
      font-weight: 800;
      font-size: 1.1rem;
      border-radius: 30px;
      letter-spacing: 2px;
      background-color: #76B900 !important;
      color: #000 !important;
      box-shadow: 0 10px 30px rgba(118, 185, 0, 0.3);
      transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(118, 185, 0, 0.5);
    }

    /* Success State */
    .success-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .success-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #76B900;
      margin-bottom: 1rem;
    }

    .whatsapp-container {
      margin: 2rem 0;
      padding: 2rem;
      background: rgba(118, 185, 0, 0.05);
      border-radius: 20px;
      border: 1px dashed rgba(118, 185, 0, 0.3);
      width: 100%;
    }

    .secondary-info { font-size: 0.9rem; color: #90A4AE; margin-bottom: 1.5rem; }

    .whatsapp-btn {
      background-color: #25D366 !important;
      color: #fff !important;
      font-weight: 700;
      border-radius: 12px;
      padding: 0.8rem 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    .fade-in { animation: fadeIn 0.8s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 600px) {
        .dialog-container {
          padding: 1.5rem;
        }
        .header h2 {
          font-size: 1.5rem;
        }
        .success-state {
          padding: 1rem 0;
          h2 { font-size: 1.8rem; }
        }
        .wa-btn {
          padding: 0.8rem 1.5rem;
          font-size: 0.9rem;
        }
      }
  `]
})
export class DiscoveryDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DiscoveryDialogComponent>);
  private leadService = inject(LeadService);

  loading = false;
  submitted = false;

  discoveryForm = this.fb.group({
    name: ['', Validators.required],
    industry: ['', Validators.required],
    painPoint: ['', Validators.required],
    hardware: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^(\\+27|0)[6-8][0-9]{8}$/)]]
  });

  async onSubmit() {
    if (this.discoveryForm.valid) {
      this.loading = true;
      try {
        await this.leadService.addLead(this.discoveryForm.value as any);
        this.submitted = true;
      } catch (error) {
        console.error('Submission failed', error);
      } finally {
        this.loading = false;
      }
    }
  }

  openWhatsApp() {
    const message = encodeURIComponent(`Hi AG, I'm ${this.discoveryForm.value.name} from ${this.discoveryForm.value.industry}. I'm interested in a Sovereign AI Strategy Session!`);
    window.open(`https://wa.me/27768132000?text=${message}`, '_blank');
  }

  close() {
    this.dialogRef.close();
  }
}

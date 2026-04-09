import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatIconModule,
    MatCheckboxModule
  ],
  template: `
    <div class="discovery-container" [class.success]="submitted">
      <!-- Form State -->
      <ng-container *ngIf="!submitted">
        <div class="header">
          <h2 class="mono">OMNILENS BETA</h2>
          <p class="subtitle">Join the elite cohort of visual pioneers.</p>
          <button mat-icon-button class="close-btn" (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <form [formGroup]="discoveryForm" (ngSubmit)="onSubmit()" class="discovery-form">
          <div class="form-grid">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>PIONEER NAME</mat-label>
              <input matInput formControlName="name" placeholder="Name and Surname">
              <mat-error *ngIf="discoveryForm.get('name')?.hasError('required')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>MAIN CONTENT MEDIUM</mat-label>
              <mat-select formControlName="industry">
                <mat-option value="infographics">Infographics & Data</mat-option>
                <mat-option value="academic">Academic & Research</mat-option>
                <mat-option value="marketing">Marketing & Social</mat-option>
                <mat-option value="events">Events & Community</mat-option>
                <mat-option value="other">Other</mat-option>
              </mat-select>
              <mat-error *ngIf="discoveryForm.get('industry')?.hasError('required')">Medium is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>CREATIVE VISION</mat-label>
              <textarea matInput formControlName="painPoint" placeholder="What kind of visuals do you want to bring to life?" rows="3"></textarea>
              <mat-error *ngIf="discoveryForm.get('painPoint')?.hasError('required')">Vision is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>PREFERRED PLATFORM</mat-label>
              <input matInput formControlName="hardware" placeholder="e.g. TikTok, LinkedIn, YouTube Reels...">
              <mat-error *ngIf="discoveryForm.get('hardware')?.hasError('required')">Platform info is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>SECURE CONTACT</mat-label>
              <input matInput formControlName="phone" placeholder="082 123 4567">
              <mat-icon matPrefix>phone</mat-icon>
              <mat-error *ngIf="discoveryForm.get('phone')?.hasError('required')">Contact is required</mat-error>
              <mat-error *ngIf="discoveryForm.get('phone')?.hasError('pattern')">Please enter a valid phone number</mat-error>
            </mat-form-field>
          </div>

          <div class="consent-container">
            <mat-checkbox formControlName="consent" color="primary">
              <span class="consent-text">
                I consent to the processing of my contact information as per the 
                <a href="/privacy" target="_blank" (click)="$event.stopPropagation()">Privacy Policy</a>.
              </span>
            </mat-checkbox>
          </div>

          <div class="actions">
            <button mat-flat-button color="primary" class="submit-btn" [disabled]="discoveryForm.invalid || loading">
              <span *ngIf="!loading">SECURE PRIORITY ACCESS</span>
              <span *ngIf="loading">TRANSMITTING...</span>
            </button>
          </div>
        </form>
      </ng-container>

      <!-- Success State -->
      <div *ngIf="submitted" class="success-state fade-in">
        <mat-icon class="success-icon">movie_filter</mat-icon>
        <h2 class="mono">STATUS: PIONEER</h2>
        <p>Your vision has been logged. You are now in the queue for the OmniLens Engine beta cohort.</p>
        
        <div class="whatsapp-container">
          <p class="secondary-info">Want to see the Build-in-Public logs or share your vision directly?</p>
          <button mat-flat-button class="whatsapp-btn" (click)="openWhatsApp()">
            <mat-icon>chat</mat-icon>
            CONTACT FOUNDER
          </button>
        </div>

        <button mat-stroked-button class="done-btn" (click)="close()">CLOSE</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; border-radius: 12px; overflow: hidden; }

    .discovery-container {
      padding: 3rem;
      max-width: 600px;
      position: relative;
      background: var(--bg-card);
      color: #fff;
      border: 1px solid var(--vault-border);
    }

    .discovery-container.success {
      text-align: center;
      padding: 5rem 3rem;
    }

    .header {
      margin-bottom: 2.5rem;
      position: relative;
    }

    h2 { font-size: 1.5rem; font-weight: 700; margin: 0; color: var(--sentinel-blue); letter-spacing: 0.1em; }
    .subtitle { color: var(--vault-muted); font-size: 0.9rem; margin-top: 0.5rem; }

    .close-btn { position: absolute; top: -1.5rem; right: -1.5rem; color: var(--vault-muted); }

    .discovery-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width { width: 100%; }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: rgba(255, 255, 255, 0.02) !important;
    }

    ::ng-deep .mat-mdc-form-field-outline {
      border-color: rgba(255, 255, 255, 0.1) !important;
    }

    .actions { margin-top: 1.5rem; }

    .submit-btn {
      width: 100%;
      height: 54px;
      font-weight: 700;
      font-size: 0.9rem;
      border-radius: 8px;
      letter-spacing: 0.1em;
      background-color: var(--sentinel-blue) !important;
      color: #fff !important;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #2563eb !important;
    }

    .consent-text { font-size: 0.75rem; color: var(--vault-muted); }
    .consent-text a { color: var(--sentinel-blue); }

    .success-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .success-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--sentinel-blue);
      margin-bottom: 1rem;
    }

    .whatsapp-container {
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: rgba(59, 130, 246, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(59, 130, 246, 0.1);
      width: 100%;
    }

    .secondary-info { font-size: 0.8rem; color: var(--vault-muted); margin-bottom: 1rem; }

    .whatsapp-btn {
      background-color: #25D366 !important;
      color: #fff !important;
      font-weight: 700;
      border-radius: 8px;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    }

    .done-btn {
      color: var(--vault-muted);
      border-color: var(--vault-border);
      border-radius: 8px;
    }

    .fade-in { animation: fadeIn 0.6s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 600px) {
      .discovery-container { padding: 2rem 1.5rem; }
      h2 { font-size: 1.3rem; }
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
    phone: ['', [Validators.required, Validators.pattern(/^((\\+27|0)[6-8][0-9]{8})$/)]],
    consent: [false, Validators.requiredTrue]
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
    const message = encodeURIComponent(`Hi AG, I'm ${this.discoveryForm.value.name} from ${this.discoveryForm.value.industry}. I'm interested in a Sentinel Governance Session!`);
    window.open(`https://wa.me/27768132000?text=${message}`, '_blank');
  }

  close() {
    this.dialogRef.close();
  }
}

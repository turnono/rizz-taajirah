import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-discovery-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title class="mono">Strategic Discovery</h2>
    <mat-dialog-content>
      <p class="intro-text">
        Briefly describe your environment. I will architect the initial strategy before our session.
      </p>
      
      <form [formGroup]="discoveryForm" class="discovery-form">
        <mat-form-field appearance="outline">
          <mat-label>Full Name</mat-label>
          <input matInput formControlName="name" placeholder="John Doe">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Business Type / Industry</mat-label>
          <input matInput formControlName="businessType" placeholder="Legal, Engineering, etc.">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Primary 'Time-Waster' (Bottleneck)</mat-label>
          <textarea matInput formControlName="timeWaster" placeholder="e.g., Auditing 500 invoices manually..."></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Primary Laptop / Hardware Model</mat-label>
          <input matInput formControlName="laptopModel" placeholder="MacBook M2 Max, RTX 4090, etc.">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()" class="mono">CANCEL</button>
      <button mat-flat-button color="primary" (click)="onSubmit()" [disabled]="!discoveryForm.valid" class="mono">
        SUBMIT STRATEGY REQUEST
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .discovery-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
      min-width: 400px;
    }
    .intro-text {
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    mat-form-field { width: 100%; }
    ::ng-deep .mat-mdc-dialog-container {
      border-radius: 1.5rem !important;
      background: #121212 !important;
      border: 1px solid rgba(255,255,255,0.1);
    }
  `]
})
export class DiscoveryDialogComponent {
  private fb = inject(FormBuilder);
  
  discoveryForm = this.fb.group({
    name: ['', Validators.required],
    businessType: ['', Validators.required],
    timeWaster: ['', Validators.required],
    laptopModel: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<DiscoveryDialogComponent>
  ) {}

  onSubmit() {
    if (this.discoveryForm.valid) {
      console.log('Discovery Data:', this.discoveryForm.value);
      // Here we could trigger a signal update or service call
      this.dialogRef.close(this.discoveryForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

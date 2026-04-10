import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiscoveryDialogComponent } from '../../features/discovery/discovery-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="header-container">
      <mat-toolbar>
        <a class="logo-container" href="/">
          <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="logo">
          <span class="brand-name mono">TAAJIRAH SYSTEMS</span>
        </a>
        
        <span class="spacer"></span>

        <!-- Desktop Navigation -->
        <nav class="nav-links mono hide-mobile">
          <a mat-button href="#cinema" class="nav-link">ENGINE</a>
          <a mat-button href="#pillars" class="nav-link">PILLARS</a>
          <a mat-button href="#flow" class="nav-link">FLOW</a>
          <a mat-button href="#cta-final" class="nav-link">BETA</a>
        </nav>

        <!-- Mobile Navigation (Burger) -->
        <div class="mobile-nav show-mobile">
          <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-btn">
            <mat-icon>menu</mat-icon>
          </button>
          <mat-menu #menu="matMenu" class="mobile-menu-panel">
            <a mat-menu-item href="#cinema" class="mono">ENGINE</a>
            <a mat-menu-item href="#pillars" class="mono">PILLARS</a>
            <a mat-menu-item href="#flow" class="mono">FLOW</a>
            <a mat-menu-item href="#cta-final" class="mono">BETA</a>
          </mat-menu>
        </div>
 
        <span class="spacer"></span>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="launchApp()" class="mono cta-btn">
            <span class="hide-mobile">LAUNCH APP</span>
            <mat-icon class="show-mobile">rocket_launch</mat-icon>
          </button>
        </div>
      </mat-toolbar>
    </div>
  `,
  styles: [`
    .header-container {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 1.5rem 0;
      display: flex;
      justify-content: center;
      background: linear-gradient(to bottom, var(--bg-deep) 0%, transparent 100%);
    }

    mat-toolbar {
      pointer-events: auto;
      max-width: 1400px;
      border-radius: 12px;
      background: rgba(10, 12, 16, 0.8) !important;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 0.5rem 2.5rem; // Increased toolbar internal padding
      height: 80px; // Increased height slightly
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .logo {
      height: 32px;
      width: auto;
      filter: brightness(1.2);
    }

    .brand-name {
      font-weight: 700;
      letter-spacing: 0.1em;
      font-size: 1rem;
      color: #fff;
    }

    .nav-links {
      display: flex;
      gap: 0.5rem;
      margin: 0 1.5rem;
    }

    .nav-link {
      color: var(--steel);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      transition: all 0.3s ease;

      &:hover {
        color: var(--sentinel-blue);
        background: rgba(59, 130, 246, 0.05);
      }
    }

    .cta-btn {
      font-weight: 700;
      letter-spacing: 0.05em;
      border-radius: 4px;
      font-size: 0.75rem;
      padding: 0 1.5rem !important;
      background-color: var(--sentinel-blue) !important;
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
    }

    .menu-btn {
      color: var(--sentinel-blue);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .show-mobile { display: none; }

    @media (max-width: 900px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
      
      mat-toolbar { 
        padding: 0.5rem 1rem; 
        border-radius: 1.5rem;
      }
      .brand-name { font-size: 0.9rem; }
      .logo { height: 28px; }
      .cta-btn { 
        height: 48px;
        min-width: 48px;
        padding: 0;
        border-radius: 8px;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .brand-name { display: none; }
    }
  `]
})
export class HeaderComponent {
  private dialog = inject(MatDialog);

  launchApp() {
    window.open('https://tjr-omnilens.web.app', '_blank');
  }

  openDiscovery() {
    this.dialog.open(DiscoveryDialogComponent, {
      width: '500px',
      maxWidth: '95vw'
    });
  }
}

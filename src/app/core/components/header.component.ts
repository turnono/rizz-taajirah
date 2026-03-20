import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule
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
          <a mat-button href="#strategy" class="nav-link">STRATEGY</a>
          <a mat-button href="#architecture" class="nav-link">ARCHITECTURE</a>
          <a mat-button href="#pricing" class="nav-link">PRICING</a>
          <a mat-button href="#architect" class="nav-link">THE ARCHITECT</a>
        </nav>

        <!-- Mobile Navigation (Burger) -->
        <div class="mobile-nav show-mobile">
          <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-btn">
            <mat-icon>menu</mat-icon>
          </button>
          <mat-menu #menu="matMenu" class="mobile-menu-panel">
            <a mat-menu-item href="#strategy" class="mono">STRATEGY</a>
            <a mat-menu-item href="#architecture" class="mono">ARCHITECTURE</a>
            <a mat-menu-item href="#pricing" class="mono">PRICING</a>
            <a mat-menu-item href="#architect" class="mono">THE ARCHITECT</a>
          </mat-menu>
        </div>
 
        <span class="spacer"></span>

        <div class="actions">
          <a mat-raised-button color="primary" href="https://wa.me/27827583593?text=I%20would%20like%20to%20book%20an%20on-site%20demo%20for%20NVIDIA%20NemoClaw." class="mono cta-btn">
            <span class="hide-mobile">WhatsApp Demo</span>
            <mat-icon class="show-mobile">chat</mat-icon>
          </a>
        </div>
      </mat-toolbar>
    </div>
  `,
  styles: [`
    .header-container {
      position: relative;
      padding: 2rem 0;
      display: flex;
      justify-content: center;
      background: rgba(10, 10, 10, 0.4);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    mat-toolbar {
      pointer-events: auto; /* Re-enable clicks for items in the toolbar */
      max-width: 1200px;
      border-radius: 2rem;
      background: rgba(10, 10, 10, 0.8) !important;
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.5rem 2rem;
      height: auto;
      min-height: 64px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .brand-name {
      font-weight: 800;
      letter-spacing: 2px;
      font-size: 1.2rem;
      color: #fff;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      margin: 0 2rem;
    }

    .nav-link {
      color: var(--steel);
      font-weight: 500;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 1px;
      transition: color 0.3s ease;

      &:hover {
        color: var(--nvidia);
      }
    }

    .cta-btn {
      font-weight: 700;
      letter-spacing: 0.5px;
      border-radius: 2rem;
      box-shadow: 0 4px 15px rgba(118, 185, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .menu-btn {
      color: var(--nvidia);
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
      .brand-name { font-size: 1rem; }
      .logo { height: 32px; }
      .cta-btn { 
        height: 48px;
        min-width: 48px;
        padding: 0;
        border-radius: 50%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .brand-name { display: none; }
      mat-toolbar { border-radius: 1rem; }
    }
  `]
})
export class HeaderComponent {}

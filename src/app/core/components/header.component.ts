import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Added for MatCard
import { MatListModule } from '@angular/material/list'; // Added for MatList

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatListModule], // Updated imports
  template: `
    <div class="header-container">
      <mat-toolbar>
        <a class="logo-container" href="/">
          <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="logo">
          <span class="brand-name mono">TAAJIRAH SYSTEMS</span>
        </a>
        
        <span class="spacer"></span>

        <nav class="nav-links mono">
          <a mat-button href="#strategy" class="nav-link">STRATEGY</a>
          <a mat-button href="#architecture" class="nav-link">ARCHITECTURE</a>
          <a mat-button href="#pricing" class="nav-link">PRICING</a>
          <a mat-button href="#architect" class="nav-link">THE ARCHITECT</a>
        </nav>
 
        <span class="spacer"></span>

        <div class="actions">
          <a mat-raised-button color="primary" href="https://wa.me/27827583593?text=I%20would%20like%20to%20book%20an%20on-site%20demo%20for%20NVIDIA%20NemoClaw." class="mono cta-btn">
            WhatsApp Demo
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
    }

    .spacer {
      flex: 1 1 auto;
    }

    @media (max-width: 900px) {
      .nav-links { display: none; }
    }
  `]
})
export class HeaderComponent {}

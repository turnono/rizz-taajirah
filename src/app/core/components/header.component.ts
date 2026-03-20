import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="glass fade-in">
      <div class="content-wrapper">
        <div class="brand">
          <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="logo">
          <div class="brand-text">
            <span class="brand-name mono">TAAJIRAH SYSTEMS</span>
            <span class="brand-tagline mono">AI ARCHITECTS</span>
          </div>
        </div>
        
        <nav class="desktop-nav mono">
          <a href="#hero">OVERVIEW</a>
          <a href="#why">BENEFITS</a>
          <a href="#pricing">PRICING</a>
        </nav>

        <div class="actions">
          <a href="https://wa.me/27827583593?text=I%20would%20like%20to%20book%20an%20on-site%20demo%20for%20NVIDIA%20NemoClaw." class="btn-sm mono">DEMO</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: relative;
      margin: 1rem auto 0;
      max-width: 1100px;
      padding: 0.75rem 1.5rem;
      border-radius: 1.25rem;
      display: flex;
      justify-content: center;
    }

    .content-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo {
      height: 32px;
      width: auto;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.1em;
    }

    .brand-tagline {
      font-size: 0.6rem;
      color: var(--vault-accent);
      letter-spacing: 0.2em;
    }

    .desktop-nav {
      display: flex;
      gap: 2rem;
    }

    .desktop-nav a {
      text-decoration: none;
      color: var(--vault-muted);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      transition: color 0.2s ease;
    }

    .desktop-nav a:hover {
      color: var(--vault-accent);
    }

    .btn-sm {
      background: var(--vault-accent);
      color: var(--vault-bg);
      padding: 0.4rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
    }

    @media (max-width: 768px) {
      .desktop-nav { display: none; }
    }
  `]
})
export class HeaderComponent {}

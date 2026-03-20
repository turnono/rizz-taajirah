import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="fade-in">
      <div class="footer-container">
        <div class="footer-col brand-col">
          <div class="brand">
            <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="logo">
            <span class="brand-name mono">TAAJIRAH SYSTEMS</span>
          </div>
          <p class="slogan mono">Engineered in South Africa.</p>
          <p class="region mono">Serving Roodepoort, JHB, and Sandton corridors.</p>
          <p class="partner-note mono">NVIDIA NemoClaw Implementation Partner (Independent)</p>
          
          <div class="legal-links">
            <a href="/terms" class="mono">TERMS</a>
            <a href="/privacy" class="mono">PRIVACY</a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright mono">&copy; {{ currentYear }} TAAJIRAH SYSTEMS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      border-top: 1px solid var(--vault-border);
      background: rgba(15, 23, 42, 0.3);
      padding: 4rem 0 2rem;
      margin-top: 4rem;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .logo { height: 28px; width: auto; opacity: 0.8; }

    .brand-name {
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.15em;
    }

    .slogan {
      color: var(--vault-muted);
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    .partner-note {
      color: var(--vault-accent);
      font-size: 0.65rem;
      margin-bottom: 2rem;
      letter-spacing: 0.1em;
      opacity: 0.8;
    }

    .legal-links {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .legal-links a {
      color: var(--vault-muted);
      text-decoration: none;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      transition: color 0.2s ease;
    }

    .legal-links a:hover { color: var(--vault-accent); }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 2rem;
      text-align: center;
    }

    .copyright {
      font-size: 0.65rem;
      color: var(--vault-muted);
      letter-spacing: 0.2em;
      opacity: 0.5;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

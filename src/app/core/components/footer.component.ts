import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="fade-in">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-col brand-col">
            <div class="brand">
              <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="logo">
              <span class="brand-name mono">TAAJIRAH SYSTEMS</span>
            </div>
            <p class="slogan mono">The Cinematic Knowledge Engine.</p>
            <p class="region mono">Operating from Johannesburg, South Africa.</p>
            <p class="partner-note mono">The Future of Visual Content.</p>
          </div>

          <div class="footer-col links-col">
            <h4 class="mono">ENGINE</h4>
            <div class="footer-links">
              <a href="#cinema" class="mono">CINEMA STAGE</a>
              <a href="#pillars" class="mono">PILLARS</a>
              <a href="#flow" class="mono">WORKFLOW</a>
            </div>
          </div>

          <div class="footer-col links-col">
            <h4 class="mono">LEGAL</h4>
            <div class="footer-links">
              <a href="/terms" class="mono">TERMS</a>
              <a href="/privacy" class="mono">PRIVACY</a>
            </div>
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
      background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.5));
      padding: 6rem 0 3rem;
      margin-top: 4rem;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .logo { height: 32px; width: auto; filter: grayscale(1) brightness(1.5); opacity: 0.6; }

    .brand-name {
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.15em;
      color: #fff;
    }

    .slogan {
      color: var(--vault-muted);
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    .region {
      color: var(--steel);
      font-size: 0.7rem;
      margin-bottom: 0.5rem;
      opacity: 0.6;
    }

    .partner-note {
      color: var(--sentinel-blue);
      font-size: 0.65rem;
      margin-top: 1.5rem;
      letter-spacing: 0.1em;
      opacity: 0.7;
    }

    h4 {
      color: #fff;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      margin-bottom: 2rem;
      opacity: 0.5;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-links a {
      color: var(--vault-muted);
      text-decoration: none;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      transition: all 0.3s ease;
    }

    .footer-links a:hover { 
      color: var(--sentinel-blue);
      transform: translateX(4px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 3rem;
      text-align: center;
    }

    .copyright {
      font-size: 0.6rem;
      color: var(--vault-muted);
      letter-spacing: 0.3em;
      opacity: 0.4;
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      
      .brand-col { text-align: center; display: flex; flex-direction: column; align-items: center; }
      .links-col { text-align: center; }
      .footer-links { align-items: center; }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

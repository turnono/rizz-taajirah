import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-page">
      <nav class="legal-nav">
        <button class="back-btn" (click)="goHome()">← Back to Systems</button>
      </nav>
      
      <main class="legal-content fade-in">
        <header class="legal-header">
          <div class="status-tag">PUBLIC_DOCUMENT</div>
          <h1>Privacy Policy</h1>
          <p class="last-updated">VERSION 2.5.0 // UPDATED 2026-03-19</p>
        </header>

        <section class="legal-section">
          <h2>1. Data Autonomy</h2>
          <p>We adhere to "Privacy by Design" principles. As developers of sovereign infrastructure, we minimize data collection to the absolute technical minimum required for secure communication.</p>
        </section>

        <section class="legal-section">
          <h2>2. Local Residency</h2>
          <p>Any technical data processed during demonstrations or consultation remains within South African jurisdiction. We do not transmit diagnostic or client data to offshore cloud providers.</p>
        </section>

        <section class="legal-section">
          <h2>3. Contact Protocol</h2>
          <p>For inquiries regarding POPIA compliance or system audits, contact the architecture team:</p>
          <a href="mailto:taajirah0@gmail.com" class="legal-link">taajirah0&#64;gmail.com</a>
        </section>
      </main>

      <footer class="legal-footer">
        <p>© 2026 TAAJIRAH SYSTEMS // SOVEREIGN AI SECURED</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .legal-page {
        min-height: 100vh;
        background: #010810;
        color: #e8f4f8;
        font-family: 'Inter', sans-serif;
        padding-bottom: 4rem;
      }
      .legal-nav {
        padding: 1.5rem 2rem;
        background: rgba(0,255,136,0.03);
        border-bottom: 1px solid rgba(0,255,136,0.1);
      }
      .back-btn {
        background: transparent;
        border: 1px solid rgba(0,255,136,0.3);
        color: #00ff88;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .back-btn:hover {
        background: rgba(0,255,136,0.1);
        border-color: #00ff88;
      }
      .legal-content {
        max-width: 800px;
        margin: 4rem auto;
        padding: 0 2rem;
      }
      .legal-header { margin-bottom: 3rem; }
      .status-tag {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: #00ff88;
        background: rgba(0,255,136,0.1);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 1rem;
        letter-spacing: 1px;
      }
      h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
      .last-updated { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #4a7a8a; }
      .legal-section { margin-bottom: 2.5rem; }
      h2 { font-size: 1.25rem; color: #00ff88; margin-bottom: 1rem; font-family: 'JetBrains Mono', monospace; }
      p { line-height: 1.7; color: #8ab4c9; margin-bottom: 1rem; }
      .legal-link { color: #00ff88; text-decoration: none; font-weight: 600; }
      .legal-footer {
        text-align: center;
        padding: 2rem;
        border-top: 1px solid rgba(255,255,255,0.05);
        font-size: 0.7rem;
        color: #2a5a6a;
        font-family: 'JetBrains Mono', monospace;
      }
    `,
  ],
})
export class PrivacyComponent {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/']);
  }
}

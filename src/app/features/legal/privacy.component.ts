import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-container fade-in">
      <h1 class="vault-gradient-text">Privacy Policy</h1>
      <p class="last-updated mono">Last Updated: March 20, 2026</p>

      <section>
        <h2>1. Data Collection</h2>
        <p>Taajirah Systems operates on a "Privacy by Design" principle. We do not collect personal data through our website except for necessary session cookies defined in our cookie policy.</p>
      </section>

      <section>
        <h2>2. POPIA Compliance</h2>
        <p>Our NVIDIA NemoClaw implementation is designed to help your firm meet POPIA requirements by ensuring data remains on your sovereign local infrastructure.</p>
      </section>

      <section>
        <h2>3. Third Parties</h2>
        <p>We do not share any information with third-party cloud analytics or advertising platforms.</p>
      </section>

      <div class="cta">
        <a href="/" class="btn-link mono">← BACK TO HOME</a>
      </div>
    </div>
  `,
  styles: [`
    .legal-container {
      max-width: 800px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; margin-top: 2rem; color: var(--vault-accent); }
    .last-updated { font-size: 0.75rem; color: var(--vault-muted); margin-bottom: 2rem; }
    p { line-height: 1.6; color: var(--vault-muted); }
    .cta { margin-top: 4rem; }
    .btn-link { color: var(--vault-accent); text-decoration: none; font-weight: 700; }
  `]
})
export class PrivacyComponent {}

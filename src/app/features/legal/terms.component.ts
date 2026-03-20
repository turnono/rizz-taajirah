import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-container fade-in">
      <h1 class="vault-gradient-text">Terms and Conditions</h1>
      <p class="last-updated mono">Last Updated: March 20, 2026</p>
      
      <section>
        <h2>1. Services</h2>
        <p>Taajirah Systems provides professional AI implementation services specializing in NVIDIA NemoClaw. These services are delivered on-site and are subject to availability.</p>
      </section>

      <section>
        <h2>2. Professional Services Fee</h2>
        <p>The implementation fee of R2,500 is a flat rate per site audit and local environment launch. This fee is non-refundable once the audit has commenced.</p>
      </section>

      <section>
        <h2>3. Data Sovereignty</h2>
        <p>We prioritize local infrastructure. Clients are responsible for providing the necessary hardware as specified in our on-site audit.</p>
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
export class TermsComponent {}

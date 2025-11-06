import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'local-identity-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="local-identity fade-in">
      <h2>Rooted in South Africa</h2>
      <p>
        We build AI solutions for real people in Africa — rooted in Cape Malay heritage,
        South African reality, and human-centered design.
      </p>
    </section>
  `,
  styles: [
    `
      .local-identity { padding: 1rem; text-align: center; }
      .local-identity h2 { margin: 0 0 0.5rem 0; color: var(--tjr-sand); }
      .local-identity p { margin: 0; color: #e5e5e5; }
    `,
  ],
})
export class LocalIdentitySectionComponent {}

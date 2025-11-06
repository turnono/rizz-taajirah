import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtaButtonComponent } from './cta-button.component';

@Component({
  selector: 'hero-tajirah',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="hero-tajirah fade-in">
      <div class="portrait" aria-label="Portrait placeholder"></div>
      <div class="copy">
        <h2>Meet Tājirah</h2>
        <p>
          A South African Muslim developer, educator, and AI media storyteller. I help people and businesses
          use AI to grow, create, and learn.
        </p>
        <cta-button label="Talk to Tājirah"></cta-button>
      </div>
    </section>
  `,
  styles: [
    `
      .hero-tajirah {
        display: grid;
        grid-template-columns: 140px 1fr;
        gap: 1rem;
        align-items: center;
        padding: 1.25rem 1rem 0.5rem 1rem;
      }
      .portrait {
        width: 140px; height: 140px; border-radius: 16px;
        background: linear-gradient(135deg, var(--tjr-deep-teal), var(--tjr-bronze));
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      }
      .copy h2 { margin: 0 0 0.5rem 0; color: var(--tjr-sand); }
      .copy p { margin: 0 0 0.75rem 0; color: #eaeaea; max-width: 60ch; }
      @media (max-width: 600px) {
        .hero-tajirah { grid-template-columns: 1fr; }
        .portrait { width: 100%; height: 160px; }
      }
    `,
  ],
})
export class HeroTajirahComponent {}

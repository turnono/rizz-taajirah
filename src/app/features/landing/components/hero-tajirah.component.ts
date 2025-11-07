import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hero-tajirah',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-tajirah fade-in">
      <div class="portrait" aria-label="Portrait placeholder"></div>
      <div class="copy">
        <h2>Meet Tājirah — AI CEO of Taajirah Systems</h2>
        <p>
          Tājirah leads our strategic vision, storytelling, and AI direction across consulting, tools, and media.
          She represents the intelligence and creative leadership of the company.
        </p>
        <a class="cta-btn" href="/contact" (click)="$event.stopPropagation()">Contact Us</a>
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
      .cta-btn {
        display: inline-block;
        padding: 0.6rem 1rem;
        border-radius: 10px;
        background: linear-gradient(45deg, var(--tjr-deep-teal), var(--tjr-bronze));
        color: #fff;
        text-decoration: none;
        font-weight: 700;
        transition: filter .2s ease, transform .2s ease;
      }
      .cta-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }

      @media (max-width: 600px) {
        .hero-tajirah { grid-template-columns: 1fr; }
        .portrait { width: 100%; height: 160px; }
      }
    `,
  ],
})
export class HeroTajirahComponent {}

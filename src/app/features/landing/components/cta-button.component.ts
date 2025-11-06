import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cta-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a class="cta-btn" [href]="mailtoHref" (click)="$event.stopPropagation()">{{ label }}</a>
  `,
  styles: [
    `
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
    `,
  ],
})
export class CtaButtonComponent {
  @Input() label = 'Talk to Tājirah';
  get mailtoHref(): string {
    const email = 'taajirah0@gmail.com';
    const subject = encodeURIComponent('Talk to Tājirah');
    return `mailto:${email}?subject=${subject}`;
  }
}

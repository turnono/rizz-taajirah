import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!accepted" class="cookie-popup glass fade-up">
      <div class="cookie-content">
        <div class="text-side">
          <p class="mono">WE USE ESSENTIAL COOKIES FOR SOVEREIGN PERFORMANCE. <a href="/privacy" class="accent-link">LEARN MORE</a></p>
        </div>
        <div class="button-side">
          <button (click)="accept('necessary')" class="btn-outline-sm mono">NECESSARY ONLY</button>
          <button (click)="accept('all')" class="btn-accept mono">ACCEPT ALL</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-popup {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 700px;
      padding: 1.25rem 2rem;
      border-radius: 1rem;
      z-index: 9999;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    }

    .cookie-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .text-side { flex: 1; }

    p { font-size: 0.75rem; margin: 0; color: var(--vault-muted); letter-spacing: 0.05em; line-height: 1.4; }
    
    .accent-link { color: var(--vault-accent); text-decoration: underline; }

    .button-side {
      display: flex;
      gap: 1rem;
      white-space: nowrap;
    }

    button {
      border-radius: 0.4rem;
      padding: 0.6rem 1.25rem;
      font-size: 0.75rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .btn-accept {
      background: var(--vault-accent);
      color: var(--vault-bg);
    }

    .btn-outline-sm {
      border: 1px solid var(--vault-border);
      color: var(--vault-muted);
    }

    .btn-accept:hover { transform: translateY(-2px); box-shadow: 0 4px 15px var(--vault-glow); }
    .btn-outline-sm:hover { border-color: var(--vault-accent); color: var(--vault-accent); }

    .fade-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }

    @media (max-width: 600px) {
      .cookie-content { flex-direction: column; text-align: center; }
      .button-side { width: 100%; flex-direction: column; }
    }
  `]
})
export class CookiePopupComponent implements OnInit {
  accepted = false;

  ngOnInit() {
    this.accepted = !!localStorage.getItem('cookies-accepted');
  }

  accept(type: 'all' | 'necessary') {
    localStorage.setItem('cookies-accepted', type);
    this.accepted = true;
  }
}

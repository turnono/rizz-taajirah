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
          <p class="mono">WE USE ESSENTIAL COOKIES TO ENSURE POPIA-COMPLIANT PERFORMANCE. <a href="/privacy" class="accent-link">LEARN MORE</a></p>
        </div>
        <div class="button-side">
          <button (click)="accept('necessary')" class="btn-outline-sm mono">ESSENTIAL ONLY</button>
          <button (click)="accept('all')" class="btn-accept mono">I ACCEPT</button>
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
      max-width: 1400px;
      padding: 2.5rem 4rem;
      border-radius: 12px;
      z-index: 9999;
      background: rgba(10, 12, 16, 0.95);
      backdrop-filter: blur(24px);
      border: 1px solid var(--vault-border);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }

    .cookie-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 3rem;
    }

    p { 
      font-size: 0.75rem; 
      margin: 0; 
      color: var(--steel); 
      letter-spacing: 0.05em; 
      line-height: 1.5; 
      font-weight: 500;
    }
    
    .accent-link { 
      color: var(--sentinel-blue); 
      text-decoration: none; 
      font-weight: 600;
      border-bottom: 1px solid rgba(59, 130, 246, 0.3);
    }

    .button-side {
      display: flex;
      gap: 0.75rem;
      white-space: nowrap;
    }

    button {
      border-radius: 6px;
      padding: 0.6rem 1.25rem;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .btn-accept {
      background: var(--sentinel-blue) !important;
      color: #fff !important;
      border: none;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }

    .btn-outline-sm {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--steel) !important;
    }

    .btn-accept:hover { 
      transform: translateY(-1px); 
      background: #2563eb !important;
    }
    
    .btn-outline-sm:hover { 
      border-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.05);
    }

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

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
      width: 95%;
      max-width: 800px;
      padding: 1.5rem 2.5rem;
      border-radius: 20px;
      z-index: 9999;
      background: rgba(15, 15, 15, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(118, 185, 0, 0.3);
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    }

    .cookie-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    p { 
      font-size: 0.85rem; 
      margin: 0; 
      color: var(--steel); 
      letter-spacing: 1px; 
      line-height: 1.5; 
      font-weight: 500;
    }
    
    .accent-link { 
      color: var(--nvidia); 
      text-decoration: underline; 
      font-weight: 700;
    }

    .button-side {
      display: flex;
      gap: 1rem;
      white-space: nowrap;
    }

    button {
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .btn-accept {
      background: var(--nvidia) !important;
      color: #000 !important;
      border: none;
      box-shadow: 0 4px 15px rgba(118, 185, 0, 0.3);
    }

    .btn-outline-sm {
      background: transparent;
      border: 1px solid var(--steel);
      color: #fff !important;
    }

    .btn-accept:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 8px 25px rgba(118, 185, 0, 0.5); 
    }
    
    .btn-outline-sm:hover { 
      border-color: #fff;
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

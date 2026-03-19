import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="archive-root">
      <!-- Archive Banner -->
      <div class="archive-banner">
        <span class="archive-icon">📁</span>
        <span class="archive-text">
          You are viewing the <strong>legacy Taajirah Systems portfolio.</strong>
        </span>
        <button class="back-btn" (click)="router.navigate([''])">
          ← Back to The Hub
        </button>
      </div>

      <!-- Legacy Content Notice -->
      <div class="legacy-notice">
        <div class="notice-inner">
          <h2>Legacy Portfolio Archive</h2>
          <p>
            Taajirah Systems has pivoted to focus on <strong>The Hub v2.5</strong> — our flagship
            Sovereign AI Appliance for South African Law and Finance firms.
          </p>
          <p>
            Our previous portfolio included: Hadiya Gift AI, VisionaryClones, BananaBoard,
            82ndrop, 7pace MCP, DataCommons MCP, Taajirah Mobility, Taajirah Supply, and the
            Quranic Arabic Learning Platform.
          </p>
          <p>
            For inquiries about any of these projects, contact us at
            <a href="mailto:taajirah0@gmail.com" class="contact-link">taajirah0&#64;gmail.com</a>
          </p>
          <button class="hub-btn" (click)="router.navigate([''])">
            Discover The Hub v2.5 →
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #0a0a0a; min-height: 100vh; }

    .archive-root {
      font-family: 'Inter', Arial, sans-serif;
      color: #e0e0e0;
    }

    .archive-banner {
      position: sticky;
      top: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 2rem;
      background: rgba(10, 25, 41, 0.97);
      border-bottom: 2px solid rgba(0, 255, 136, 0.4);
      backdrop-filter: blur(10px);
      flex-wrap: wrap;
    }

    .archive-icon { font-size: 1.2rem; }

    .archive-text {
      flex: 1;
      font-size: 0.9rem;
      color: #8ab4c9;
    }

    .archive-text strong { color: #e8f4f8; }

    .back-btn {
      background: transparent;
      border: 1px solid rgba(0, 255, 136, 0.5);
      color: #00ff88;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .back-btn:hover {
      background: rgba(0, 255, 136, 0.1);
      border-color: #00ff88;
    }

    .legacy-notice {
      min-height: calc(100vh - 60px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      background: radial-gradient(ellipse 800px 500px at 50% 40%, rgba(0, 255, 136, 0.03), transparent);
    }

    .notice-inner {
      max-width: 600px;
      text-align: center;
      background: rgba(10, 25, 41, 0.8);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 16px;
      padding: 3rem 2.5rem;
      backdrop-filter: blur(10px);
    }

    .notice-inner h2 {
      font-size: 1.8rem;
      color: #00ff88;
      margin-bottom: 1.5rem;
      font-family: 'JetBrains Mono', monospace;
    }

    .notice-inner p {
      color: #8ab4c9;
      line-height: 1.7;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .notice-inner p strong { color: #e8f4f8; }

    .contact-link {
      color: #00bfff;
      text-decoration: none;
    }

    .contact-link:hover { text-decoration: underline; }

    .hub-btn {
      margin-top: 2rem;
      background: linear-gradient(135deg, #00ff88, #00e87a);
      color: #020b12;
      border: none;
      padding: 0.85rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.2s ease;
      letter-spacing: 0.5px;
    }

    .hub-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.35);
    }
  `]
})
export class ArchiveComponent {
  constructor(public router: Router) {}
}

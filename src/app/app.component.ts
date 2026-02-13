import { Component, OnInit, ErrorHandler, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from './core/services/analytics.service';
import { VisualAgentComponent } from './features/visual-agent/visual-agent.component';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <!-- Cyberpunk background elements -->
      <div class="cyberpunk-background"></div>
      <div class="noise-overlay"></div>
      <div class="scan-line"></div>
      <!-- Removed heavy GIF animations for performance -->

      <!-- Metal Gear Solid Style Overlays -->
      <div class="mgs-overlay">
        <!-- Tactical Grid -->
        <div class="tactical-grid"></div>

        <!-- Corner Frames -->
        <div class="corner-frame top-left"></div>
        <div class="corner-frame top-right"></div>
        <div class="corner-frame bottom-left"></div>
        <div class="corner-frame bottom-right"></div>

        <!-- Side HUD Elements -->
        <div class="hud-element left-hud">
          <div class="hud-line"></div>
          <div class="hud-indicator"></div>
        </div>
        <div class="hud-element right-hud">
          <div class="hud-line"></div>
          <div class="hud-indicator"></div>
        </div>

        <!-- Mathematics Overlay -->
        <div class="mathematics-overlay">
          <div
            class="math-formula"
            *ngFor="let formula of mathFormulas; let i = index"
            [style.top.%]="formula.top"
            [style.left.%]="formula.left"
            [style.animation-delay]="i * 2 + 's'"
          >
            {{ formula.text }}
          </div>
        </div>
      </div>
      
      <!-- Visual Agent Overlay -->
      <app-visual-agent></app-visual-agent>

      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: [
    `
      :host {
        display: block;
        --cyberpunk-primary: #00ff00;
        --cyberpunk-bg: #000000;
        --cyberpunk-bg-transparent: rgba(0, 0, 0, 0.95);
      }

      /* Force hidden pages to be truly hidden */
      .ion-page-hidden {
        display: none !important;
      }

      .cyberpunk-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background: var(--cyberpunk-bg);
      }

      .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/png;base64,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');
        opacity: 0.03;
        pointer-events: none;
        z-index: 10;
      }

      .scan-line {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          rgba(0, 255, 0, 0.2) 50%,
          transparent 100%
        );
        animation: scan 8s linear infinite;
        pointer-events: none;
        z-index: 10;
      }

      @keyframes scan {
        0% {
          transform: translateY(-100vh);
        }
        100% {
          transform: translateY(100vh);
        }
      }

      /* Removed GIF container styles for performance */

      ion-router-outlet {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
      }

      /* Metal Gear Solid Style Overlays */
      .mgs-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 6;
      }

      .tactical-grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(
            rgba(0, 255, 0, 0.1) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
        background-size: 40px 40px;
        animation: gridPulse 8s infinite ease-in-out;
      }

      @keyframes gridPulse {
        0%,
        100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.6;
        }
      }

      /* Corner Frames */
      .corner-frame {
        position: absolute;
        width: 80px;
        height: 80px;
        border: 3px solid rgba(0, 255, 255, 0.9);
        z-index: 4;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.6),
          inset 0 0 15px rgba(0, 255, 255, 0.2);
      }

      .corner-frame::before,
      .corner-frame::after {
        content: '';
        position: absolute;
        background: rgba(0, 255, 255, 0.7);
      }

      .top-left {
        top: 20px;
        left: 20px;
        border-right: none;
        border-bottom: none;
        animation: cornerGlow 3s infinite ease-in-out;
      }

      .top-left::before {
        top: -2px;
        left: -2px;
        width: 20px;
        height: 2px;
      }

      .top-left::after {
        top: -2px;
        left: -2px;
        width: 2px;
        height: 20px;
      }

      .top-right {
        top: 20px;
        right: 20px;
        border-left: none;
        border-bottom: none;
        animation: cornerGlow 3s infinite ease-in-out 0.5s;
      }

      .top-right::before {
        top: -2px;
        right: -2px;
        width: 20px;
        height: 2px;
      }

      .top-right::after {
        top: -2px;
        right: -2px;
        width: 2px;
        height: 20px;
      }

      .bottom-left {
        bottom: 20px;
        left: 20px;
        border-right: none;
        border-top: none;
        animation: cornerGlow 3s infinite ease-in-out 1s;
      }

      .bottom-left::before {
        bottom: -2px;
        left: -2px;
        width: 20px;
        height: 2px;
      }

      .bottom-left::after {
        bottom: -2px;
        left: -2px;
        width: 2px;
        height: 20px;
      }

      .bottom-right {
        bottom: 20px;
        right: 20px;
        border-left: none;
        border-top: none;
        animation: cornerGlow 3s infinite ease-in-out 1.5s;
      }

      .bottom-right::before {
        bottom: -2px;
        right: -2px;
        width: 20px;
        height: 2px;
      }

      .bottom-right::after {
        bottom: -2px;
        right: -2px;
        width: 2px;
        height: 20px;
      }

      @keyframes cornerGlow {
        0%,
        100% {
          opacity: 0.4;
          box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
        }
        50% {
          opacity: 1;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
        }
      }

      /* HUD Elements */
      .hud-element {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 4;
      }

      .left-hud {
        left: 15px;
      }

      .right-hud {
        right: 15px;
      }

      .hud-line {
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, rgba(0, 255, 0, 1), transparent);
        margin-bottom: 10px;
        animation: hudPulse 2s infinite ease-in-out;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
      }

      .right-hud .hud-line {
        background: linear-gradient(270deg, rgba(0, 255, 255, 1), transparent);
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
      }

      .hud-indicator {
        width: 8px;
        height: 8px;
        background: rgba(0, 255, 0, 0.9);
        border-radius: 50%;
        animation: indicatorBlink 1.5s infinite;
      }

      .right-hud .hud-indicator {
        background: rgba(0, 255, 255, 0.9);
        margin-left: auto;
      }

      @keyframes hudPulse {
        0%,
        100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }

      @keyframes indicatorBlink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      /* Mathematics Overlay */
      .mathematics-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }

      .math-formula {
        position: absolute;
        font-family: 'Times New Roman', serif;
        font-size: 1.2rem;
        font-weight: normal;
        user-select: none;
        pointer-events: none;
        opacity: 0.4;
        text-shadow: 0 0 5px currentColor;
        transition: all 0.8s ease;
        z-index: 1;
      }
    `,
  ],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule, VisualAgentComponent],
})
export class AppComponent implements OnInit {
  // Removed heavy GIF arrays for performance

  mathFormulas: any[] = [];

  mathSymbols = [
    'ψ',
    'Ω',
    'Δ',
    '∇',
    '∂',
    '∫',
    '∑',
    '∏',
    'α',
    'β',
    'γ',
    'δ',
    'ε',
    'ζ',
    'η',
    'θ',
    'λ',
    'μ',
    'π',
    'ρ',
    'σ',
    'τ',
    'φ',
    'χ',
    'ω',
    '≈',
    '≠',
    '≤',
    '≥',
    '∞',
    '∅',
    '∈',
    '∉',
    '⊂',
    '⊃',
    '∪',
    '∩',
    '⟨',
    '⟩',
    '|',
    '⊥',
    '∥',
    '∠',
    '°',
    '′',
    '″',
    '±',
    '∓',
    '×',
    '÷',
    '√',
    '∛',
    '∜',
    'ℏ',
    'ℝ',
    'ℂ',
    'ℕ',
    'ℤ',
    '∧',
    '∨',
    '¬',
    '→',
    '↔',
    '⇒',
    '⇔',
    '∀',
    '∃',
    '⊕',
    '⊗',
    '⊙',
    '⊘',
    '⊚',
    '⊛',
    '⊜',
    '⊝',
  ];

  colors = [
    'rgba(0, 255, 255, 0.3)', // subtle cyan
    'rgba(0, 255, 0, 0.3)', // subtle green
    'rgba(255, 0, 255, 0.3)', // subtle magenta
    'rgba(255, 255, 0, 0.3)', // subtle yellow
    'rgba(255, 100, 0, 0.3)', // subtle orange
    'rgba(100, 255, 100, 0.3)', // subtle light green
    'rgba(255, 100, 255, 0.3)', // subtle pink
    'rgba(100, 200, 255, 0.3)', // subtle light blue
    'rgba(200, 100, 255, 0.3)', // subtle purple
    'rgba(255, 200, 100, 0.3)', // subtle peach
  ];

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    // Set up global error handling
    this.setupErrorHandling();
    this.generateRandomFormulas();
    this.randomizeFormulas();
  }

  private generateRandomFormulas() {
    // Start with empty array - symbols will appear occasionally
    this.mathFormulas = [];
  }

  private randomizeFormulas() {
    const spawnSymbol = () => {
      // Only spawn if we don't have too many symbols
      if (this.mathFormulas.length < 8) {
        const randomSymbol =
          this.mathSymbols[Math.floor(Math.random() * this.mathSymbols.length)];
        const randomColor =
          this.colors[Math.floor(Math.random() * this.colors.length)];

        // Create symbol with random orientation
        const symbol = {
          text: randomSymbol,
          top: Math.random() * 100,
          left: Math.random() * 100,
          color: randomColor,
          rotation: Math.random() * 360, // Any direction: 0-360 degrees
          opacity: 0.4,
          id: Date.now() + Math.random(), // Unique ID
        };

        this.mathFormulas.push(symbol);

        // Remove symbol after 3-8 seconds
        setTimeout(() => {
          const index = this.mathFormulas.findIndex((f) => f.id === symbol.id);
          if (index > -1) {
            this.mathFormulas.splice(index, 1);
          }
        }, 3000 + Math.random() * 5000);
      }

      // Schedule next symbol spawn
      setTimeout(spawnSymbol, Math.random() * 4000 + 2000); // Every 2-6 seconds
    };

    // Start spawning symbols
    spawnSymbol();
  }

  private setupErrorHandling() {
    // Global error handler for unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.analytics.trackError(
        new Error(event.message),
        'global_javascript_error',
        {
          filename: event.filename,
          line_number: event.lineno,
          column_number: event.colno,
        }
      );
    });

    // Global handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.analytics.trackError(
        new Error(event.reason?.message || 'Unhandled promise rejection'),
        'unhandled_promise_rejection',
        {
          reason: event.reason?.toString(),
        }
      );
    });

    // Track network errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          this.analytics.trackNetworkError(
            args[0]?.toString() || 'unknown_url',
            response.status,
            response.statusText
          );
        }
        return response;
      } catch (error: any) {
        this.analytics.trackNetworkError(
          args[0]?.toString() || 'unknown_url',
          0,
          error.message
        );
        throw error;
      }
    };
  }
}
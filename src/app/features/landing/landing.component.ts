import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SovereignDiagramComponent } from '../../core/components/sovereign-diagram.component';
import { DiscoveryDialogComponent } from '../discovery/discovery-dialog.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    SovereignDiagramComponent
  ],
  template: `
    <div class="landing-page">
      <!-- ════ HERO SECTION ════ -->
      <section id="strategy" class="hero-section">
        <div class="container">
          <h1 class="hero-headline vault-gradient-text">
            Stop Paying for AI.<br>
            Start Owning Your Infrastructure.
          </h1>
          <p class="hero-subheadline">
            Hire a Senior Architect with 8 years of engineering experience to deploy a 
            <strong>Local AI Sandbox</strong> on your hardware. 100% Private. 100% POPIA-Safe.
          </p>
          <div class="hero-cta" style="margin: -15px;">
            <button mat-flat-button color="primary" class="cta-btn" (click)="openDiscovery()">
              Book Your On-Site Strategy & Deployment (R2,500)
            </button>
          </div>
        </div>
      </section>

      <!-- ════ SOVEREIGN LAPTOP SUPERCHARGE (VIDEO) ════ -->
      <section id="supercharge" class="video-section">
        <div class="container">
          <mat-card class="video-card glass">
            <div class="video-wrapper">
              <iframe 
                src="https://www.youtube.com/embed/u9vgqyXlhyE" 
                title="The Sovereign Laptop Supercharge" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
              </iframe>
            </div>
            <mat-card-header>
              <mat-card-title class="mono">The Sovereign Laptop Supercharge</mat-card-title>
              <mat-card-subtitle>Escaping the Cloud AI Trap with Local Intelligence</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>
                Watch how we transform standard hardware into a high-performance, private AI workstation. 
                No data logging. No subscription traps. Just pure, sovereign architecture.
              </p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <!-- ════ THE ARCHITECT SECTION (VERTICAL 9:16 LAYOUT) ════ -->
      <section id="architect" class="architect-section">
        <div class="container architect-grid">
          @defer (on viewport) {
            <div class="architect-visual">
              <mat-card class="image-card">
                <img ngSrc="assets/images/founder.jpg" width="720" height="1280" alt="The Senior Architect" priority>
              </mat-card>
            </div>
            
            <div class="architect-content">
              <mat-card class="info-card glass">
                <mat-card-header>
                  <mat-card-title class="nvidia-text">8 Years Senior Engineering Experience</mat-card-title>
                  <mat-card-subtitle class="mono">Daily AI Implementation & Strategy</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p class="quote">
                    "I architect AI for production-grade reliability. My R2,500 session is a specialized 
                    strategy window focused on your specific business bottlenecks."
                  </p>
                  <div class="stats-row">
                    <div class="stat">
                      <span class="label">Expertise</span>
                      <span class="value">Local LLM Architecture</span>
                    </div>
                    <div class="stat">
                      <span class="label">Sovereignty</span>
                      <span class="value">100% POPIA Hardening</span>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-flat-button color="primary" (click)="openDiscovery()">
                    START DISCOVERY
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          } @placeholder {
            <div class="loader-placeholder">LOADING ARCHITECT PROFILE...</div>
          }
        </div>
      </section>

      <!-- ════ THE SOVEREIGN CONDUIT (ARCHITECTURE) ════ -->
      <section id="architecture" class="conduit-section">
        <div class="container">
          <h2 class="section-title mono">THE SOVEREIGN CONDUIT</h2>
          <p class="section-subtitle">Bridging the gap between AI hype and real-world utility.</p>
          
          <div class="architecture-graphics">
             @defer (on viewport) {
               <app-sovereign-diagram></app-sovereign-diagram>
             } @placeholder {
               <div class="loader-placeholder">LOADING ARCHITECTURE DIAGRAM...</div>
             }
          </div>

          <div class="conduit-grid">
            <mat-card class="conduit-card glass" *ngFor="let card of conduitCards">
              <mat-card-header>
                <div mat-card-avatar class="conduit-icon">{{ card.icon }}</div>
                <mat-card-title>{{ card.title }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{ card.description }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- ════ PRICING SECTION (BULLETPROOF) ════ -->
      <section id="pricing" class="pricing-section">
        <div class="pricing-card-sovereign">
        <h3 class="pricing-title mono">STRATEGY SESSION</h3>
        <div class="pricing-price-box">
          <div class="price mono">R2,500</div>
          <div class="price-label mono">PER SESSION</div>
        </div>
        
        <div class="pricing-feature-list">
          <div class="feature-row">
            <span class="check-mark">✓</span>
            <span>60-Minute Local AI Audit</span>
          </div>
          <div class="feature-row">
            <span class="check-mark">✓</span>
            <span>Hardware Optimization Plan</span>
          </div>
          <div class="feature-row">
            <span class="check-mark">✓</span>
            <span>Data Privacy Guardrail Design</span>
          </div>
          <div class="feature-row">
            <span class="check-mark">✓</span>
            <span>Custom LLM Deployment Map</span>
          </div>
        </div>

        <button class="sovereign-action-btn mono" (click)="openDiscovery()">BOOK YOUR SESSION</button>
      </div>
      </section>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-section {
      text-align: center;
      padding: 10rem 0 6rem;
    }

    .hero-headline {
      font-size: clamp(2.5rem, 8vw, 5rem);
      margin-bottom: 2rem;
      line-height: 1.1;
    }

    .hero-subheadline {
      font-size: 1.5rem;
      color: var(--steel);
      max-width: 800px;
      margin: 0 auto 3rem;
      line-height: 1.6;
    }

    .cta-btn {
      padding: 1.5rem 3rem;
      font-size: 1.1rem;
      font-weight: 800;
      border-radius: 4rem;
    }

    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
      height: 0;
      overflow: hidden;
      border-radius: 1.5rem 1.5rem 0 0;
    }

    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-card {
      max-width: 900px;
      margin: 0 auto;
      border-radius: 1.5rem !important;
      overflow: hidden;
      border: 1px solid rgba(118, 185, 0, 0.2) !important;
    }

    .video-card mat-card-title {
      padding-top: 1.5rem;
      font-weight: 800;
      color: var(--nvidia);
    }

    .video-section {
      padding: 2rem 0;
    }

    .architect-section {
      background: radial-gradient(circle at 10% 50%, rgba(118, 185, 0, 0.05) 0%, transparent 50%);
    }

    .architect-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 4rem;
      align-items: center;
    }

    .image-card {
      border-radius: 28px !important;
      overflow: hidden;
      border: 1px solid rgba(118, 185, 0, 0.2) !important;
      box-shadow: 0 30px 60px rgba(0,0,0,0.6);
      
      img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 9/16;
        object-fit: cover;
      }
    }

    .info-card {
      padding: 2.5rem !important;
      border-radius: 28px !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;

      mat-card-title {
        font-size: 2.5rem;
        line-height: 1.1;
        margin-bottom: 1rem;
        font-weight: 800;
      }

      mat-card-subtitle {
        font-size: 1.1rem;
        color: var(--steel);
        margin-bottom: 2rem;
      }

      .quote {
        font-size: 1.25rem;
        line-height: 1.7;
        font-style: italic;
        color: rgba(255,255,255,0.9);
        margin-bottom: 3rem;
      }

      .stats-row {
        display: flex;
        gap: 3rem;
        margin-bottom: 3rem;

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .label {
            color: var(--steel);
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 2px;
          }

          .value {
            color: var(--nvidia);
            font-weight: 700;
            font-size: 1.1rem;
          }
        }
      }
    }

    @media (max-width: 900px) {
      .architect-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .image-card img {
        height: 500px;
      }
      .info-card mat-card-title {
        font-size: 2rem;
      }
    }

    .conduit-section {
      text-align: center;
    }

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      letter-spacing: 0.1em;
    }

    .section-subtitle {
      color: var(--steel);
      font-size: 1.2rem;
      margin-bottom: 4rem;
    }

    .conduit-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 4rem;
    }

    .conduit-card {
      padding: 2rem;
      border-radius: 1.5rem !important;
      text-align: left;
    }

    .conduit-icon {
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Pricing Section (Final Bulletproof Fix) ── */
    .pricing-section {
      padding: 0 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle at center, rgba(118, 185, 0, 0.08) 0%, transparent 70%);
    }

    .pricing-card-sovereign {
      background: #0A0A0A;
      border: 1px solid rgba(118, 185, 0, 0.5);
      border-radius: 40px;
      padding: 5rem 3.5rem;
      width: 100%;
      max-width: 650px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 50px 120px rgba(0,0,0,0.95);
      position: relative;
    }

    .pricing-card-sovereign::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #76B900, transparent);
    }

    .pricing-title {
      font-size: 2.8rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 2.5rem 0;
      line-height: 1.1;
      letter-spacing: -1px;
    }

    .pricing-price-box {
      margin-bottom: 4rem;
    }

    .pricing-price-box .price {
      font-size: 5rem;
      font-weight: 900;
      color: #76B900;
      line-height: 1;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 30px rgba(118, 185, 0, 0.4);
    }

    .pricing-price-box .price-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--steel);
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .pricing-feature-list {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 2rem;
      margin-bottom: 4rem;
    }

    .feature-row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
      padding: 1rem 0;
      color: #fff;
      font-size: 1.2rem;
      font-weight: 500;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .feature-row:last-child {
      border-bottom: none;
    }

    .feature-row .check-mark {
      color: #76B900;
      font-size: 1.5rem;
      font-weight: 900;
    }

    .sovereign-action-btn {
      width: 100%;
      max-width: 480px;
      height: 80px;
      background-color: #76B900 !important;
      color: #000 !important;
      border: none;
      border-radius: 40px;
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 2px;
      cursor: pointer;
      text-transform: uppercase;
      box-shadow: 0 15px 40px rgba(118, 185, 0, 0.4);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .sovereign-action-btn:hover {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 25px 60px rgba(118, 185, 0, 0.6);
      background-color: #89D910 !important;
    }

    .sovereign-action-btn:active {
      transform: translateY(0) scale(0.97);
    }

    .loader-placeholder {
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-surface);
      border-radius: 28px;
      color: var(--steel);
      font-family: var(--font-mono);
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 6rem 1rem 4rem;
      }
      .hero-headline { 
        font-size: 2.5rem; 
        margin-bottom: 1.5rem;
      }
      .hero-subheadline {
        font-size: 1.1rem;
        margin-bottom: 2.5rem;
      }
      .architect-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .image-card img {
        aspect-ratio: 16/9;
        height: 300px;
      }
      .info-card {
        padding: 1.5rem !important;
        mat-card-title { font-size: 1.8rem; }
        .stats-row { 
          flex-direction: column; 
          gap: 1.5rem; 
        }
      }
      .pricing-section {
        padding: 4rem 1rem;
      }
      .pricing-card-sovereign {
        padding: 3rem 1.5rem;
        border-radius: 24px;
      }
      .pricing-title {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
      }
      .pricing-price-box .price {
        font-size: 3.5rem;
      }
      .pricing-feature-list {
        padding: 1rem;
        margin-bottom: 2rem;
      }
      .feature-row {
        font-size: 1rem;
        gap: 1rem;
      }
      .sovereign-action-btn {
        height: 64px;
        font-size: 1.1rem;
      }
    }
  `]
})
export class LandingComponent {
  private dialog = inject(MatDialog);

  conduitCards = [
    {
      icon: '🧠',
      title: '1M Token Context',
      description: 'Audit years of complex records instantly with massive reasoning windows.'
    },
    {
      icon: '🛡️',
      title: 'Local Sandbox',
      description: "Your data is 'caged' via OpenShell on local silicon. Zero external exposure."
    },
    {
      icon: '💡',
      title: 'Expert Advisory',
      description: 'Senior strategic guidance to solve your most expensive manual bottlenecks.'
    }
  ];

  serviceList = [
    'Workflow Audit (30-min deep-dive)',
    'NemoClaw Environment Launch (Hardened)',
    'The "First Task" Completion',
    'Enterprise Privacy Briefing (POPIA)'
  ];

  openDiscovery() {
    this.dialog.open(DiscoveryDialogComponent, {
      width: '500px',
      maxWidth: '95vw'
    });
  }
}

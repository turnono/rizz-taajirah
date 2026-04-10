import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      <!-- 🚀 AG-UI SYSTEM OVERLAY -->
      <div class="ag-ui-overlay hide-mobile">
        <div class="terminal-container glass-premium">
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">TAAJIRAH_SYSTEMS_LABS</span>
          </div>
          <div class="terminal-body">
            <div class="log-stream">
              <p *ngFor="let log of logs" class="log-line">
                <span class="timestamp">[{{ log.time }}]</span>
                <span class="tag" [class]="log.type">{{ log.tag }}</span>
                {{ log.message }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ════ HERO SECTION ════ -->
      <section id="hero" class="hero-section">
        <div class="container fade-in-up">
          <div class="glitch-wrapper">
            <h1 class="hero-headline omnilens-gradient-text glitch-text" data-text="Manifesting Visual Intelligence.">
              Manifesting Visual Intelligence.
            </h1>
          </div>
          <p class="hero-subheadline">
            Taajirah Systems is the <strong>Agentic Research & Engineering Laboratory</strong> dedicated to breathing narrative life into complex data and visual knowledge.
          </p>
          <div class="hero-cta">
            <button mat-flat-button color="primary" class="cta-btn" (click)="launchApp()">
              LAUNCH FLAGSHIP
              <mat-icon>bolt</mat-icon>
            </button>
            <button mat-stroked-button class="secondary-cta" (click)="launchApp()">
              EXPLORE THE VAULT
            </button>
          </div>
        </div>
      </section>

      <!-- ════ THE BENTO GRID (PILLARS) ════ -->
      <section id="features" class="bento-section">
        <div class="container">
          <div class="section-header fade-in-up">
            <h2 class="section-title mono glitch-text" data-text="AGENTIC_FOUNDATIONS">AGENTIC_FOUNDATIONS</h2>
            <p class="section-subtitle">The architectural core of Taajirah Systems.</p>
          </div>
          
          <div class="bento-grid">
            <div class="bento-item wide glass-premium fade-in-up">
              <div class="bento-content">
                <div class="pillar-icon">🏛️</div>
                <h3 class="mono">Semantic Physics</h3>
                <p>Developing structural seeds that allow data to manifest its own reality through emergent particle behaviors and cinematic transitions.</p>
              </div>
            </div>

            <div class="bento-item tall glass-premium fade-in-up">
              <div class="bento-content">
                <div class="pillar-icon">🧬</div>
                <h3 class="mono">Agentic Workflow</h3>
                <p>Orchestrating multi-agent pipelines where specialized AI Directors, Producers, and Gauges collaborate in real-time.</p>
              </div>
            </div>

            <div class="bento-item glass-premium fade-in-up">
              <div class="bento-content">
                <div class="pillar-icon">👁️</div>
                <h3 class="mono">Visual Intelligence</h3>
                <p>Advanced spatial grounding for precise visual evidence.</p>
              </div>
            </div>

            <div class="bento-item glass-premium fade-in-up">
              <div class="bento-content">
                <div class="pillar-icon">⚡</div>
                <h3 class="mono">Swift Reactivity</h3>
                <p>Engineered for zoneless, zero-latency interaction.</p>
              </div>
            </div>

            <div class="bento-item wide glass-premium fade-in-up">
              <div class="bento-content">
                <div class="pillar-icon">🛠️</div>
                <h3 class="mono">Technical Resilience</h3>
                <p>Robust <code>withRetry</code> architectures that guarantee stability across high-throughput agentic operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ FLAGSHIP PROJECT ════ -->
      <section id="flagship" class="flagship-section">
        <div class="container">
          <div class="section-header fade-in-up">
            <h2 class="section-title mono">Flagship Release: OmniLens</h2>
            <p class="section-subtitle">Our premier cinematic knowledge engine.</p>
          </div>
        </div>
      </section>

      <!-- ════ CINEMATIC DEMO ════ -->
      <section id="cinema" class="cinema-section bg-deep">
        <div class="container">
          <div class="video-container glass-premium fade-in-up">
            <div class="tiktok-wrapper">
              <iframe 
                src="https://www.tiktok.com/embed/v2/7626041081494326549" 
                style="width: 100%; height: 750px; border: none;"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ FINAL CALL ════ -->
      <section id="cta-final" class="final-cta-section">
        <div class="container">
          <div class="glass-premium final-cta-box fade-in-up">
            <h2 class="section-title mono">INITIATE_SESSION</h2>
            <p class="section-subtitle">Your visual data is waiting for its voice.</p>
            <div class="hero-cta" style="margin-top: 3rem;">
              <button mat-flat-button color="primary" class="cta-btn big" (click)="launchApp()">
                LAUNCH OMNILENS
                <mat-icon>rocket_launch</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { 
      display: block; 
      color: #fff;
    }

    .ag-ui-overlay {
      position: fixed;
      top: 100px;
      right: 20px;
      width: 320px;
      z-index: 100;
      opacity: 0.8;
    }

    .terminal-container {
      border-radius: 12px;
      overflow: hidden;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
    }

    .terminal-header {
      background: rgba(0,0,0,0.5);
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .red { background: #ff5f56; }
    .yellow { background: #ffbd2e; }
    .green { background: #27c93f; }
    .terminal-title { margin-left: 0.5rem; color: #64748b; font-size: 0.6rem; letter-spacing: 0.1em; }

    .terminal-body {
      padding: 1rem;
      height: 180px;
      overflow: hidden;
      background: rgba(0,0,0,0.2);
    }

    .log-line { margin-bottom: 0.5rem; line-height: 1.4; color: #94a3b8; }
    .timestamp { color: #475569; margin-right: 0.5rem; }
    .tag { padding: 0.1rem 0.3rem; border-radius: 3px; margin-right: 0.5rem; font-size: 0.6rem; }
    .engine { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    .producer { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
    .physics { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

    .hero-section {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 6rem;
    }

    .omnilens-gradient-text {
      background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 12px rgba(255,255,255,0.1));
    }

    .hero-headline {
      font-size: 5.5rem;
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 2.5rem;
      letter-spacing: -0.04em;
      @media (max-width: 768px) { font-size: 3rem; }
    }

    .hero-subheadline {
      font-size: 1.6rem;
      max-width: 800px;
      margin: 0 auto 4rem;
      color: #94a3b8;
      line-height: 1.6;
      font-weight: 300;
    }

    .cta-btn {
      background: #fff !important;
      color: #000 !important;
      padding: 0 3rem !important;
      height: 64px !important;
      font-weight: 800 !important;
      border-radius: 16px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      display: flex !important;
      align-items: center !important;
      gap: 1rem !important;
      box-shadow: 0 10px 40px rgba(255, 255, 255, 0.1) !important;
    }

    .cta-btn:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 20px 60px rgba(255, 255, 255, 0.2) !important;
    }

    .secondary-cta {
      border-color: rgba(255, 255, 255, 0.2) !important;
      color: #fff !important;
      padding: 0 3rem !important;
      height: 64px !important;
      border-radius: 16px !important;
      backdrop-filter: blur(12px);
    }

    /* Bento Grid */
    .bento-section { padding: 10rem 0; }
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 300px);
      gap: 1.5rem;
      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
    }

    .bento-item {
      padding: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
      transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
      
      &:hover {
        transform: scale(1.02);
        box-shadow: 0 30px 60px rgba(0,0,0,0.4);
      }
    }

    .pillar-icon { font-size: 3rem; margin-bottom: 2rem; }
    .bento-item h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #fff; }
    .bento-item p { color: #94a3b8; line-height: 1.7; font-size: 1rem; }

    .wide { grid-column: span 2; }
    .tall { grid-row: span 2; }

    /* Demo Stage */
    .cinema-section { padding: 5rem 0 15rem; }
    .video-container {
      padding: 1.5rem;
      border-radius: 40px;
      max-width: 1000px;
      margin: 0 auto;
    }

    /* Final CTA Box */
    .final-cta-section { padding: 10rem 0; }
    .final-cta-box {
      padding: 8rem 4rem;
      border-radius: 48px;
      text-align: center;
    }

    .section-header { margin-bottom: 6rem; text-align: center; }
    .section-title { font-size: 3.5rem; margin-bottom: 1rem; color: #fff; font-weight: 800; letter-spacing: -0.02em; }
    .section-subtitle { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.6em; color: #3b82f6; }

    .fade-in-up {
      animation: fadeInUp 1.2s cubic-bezier(0.2, 0, 0.2, 1) forwards;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .bg-deep { background: #050510; }
  `]
})
export class LandingComponent implements OnInit {
  private dialog = inject(MatDialog);

  logs: any[] = [];
  private logTemplates = [
    { type: 'engine', tag: 'LABS', message: 'Optimizing Kinetic Typography Renderer...' },
    { type: 'producer', tag: 'LABS', message: 'Deploying OmniLens v2.0 Production Node...' },
    { type: 'physics', tag: 'LABS', message: 'Heartbeat: Agentic Architecture Stable.' },
    { type: 'engine', tag: 'LABS', message: 'Analyzing Spatial Grounding Foundation...' },
    { type: 'producer', tag: 'LABS', message: 'Orchestrating Studio Event Stream...' },
    { type: 'physics', tag: 'LABS', message: 'Manifesting Reality via Semantic Physics...' }
  ];

  ngOnInit() {
    this.startLogStream();
  }

  startLogStream() {
    let index = 0;
    setInterval(() => {
      const template = this.logTemplates[index % this.logTemplates.length];
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      this.logs.unshift({ ...template, time: timeStr });
      if (this.logs.length > 8) this.logs.pop();
      index++;
    }, 2500);
  }

  launchApp() {
    window.open('https://tjr-omnilens.web.app', '_blank');
  }

  openDiscovery() {
    this.dialog.open(DiscoveryDialogComponent, {
      width: '500px',
      maxWidth: '95vw'
    });
  }
}


import { Component, inject, signal } from '@angular/core';
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
      <!-- ════ HERO SECTION ════ -->
      <section id="strategy" class="hero-section">
        <div class="container fade-in-up">
          <h1 class="hero-headline omnilens-gradient-text">
            Documentary Maker<br>for your Data.
          </h1>
          <p class="hero-subheadline">
            OmniLens AI is a <strong>Cinematic Knowledge Engine</strong> that transforms static, information-dense visuals—infographics, posters, and documents—into high-engagement narrated video stories.
          </p>
          <div class="hero-cta">
            <button mat-flat-button color="primary" class="cta-btn" (click)="openDiscovery()">
              Join the OmniLens Beta
            </button>
            <button mat-stroked-button class="secondary-cta" (click)="openDiscovery()">
              See the Story Engine
            </button>
          </div>
        </div>
      </section>

      <!-- ════ THE CINEMATIC STAGE (VIDEO DEMO) ════ -->
      <section id="cinema" class="cinema-section bg-deep">
        <div class="container">
          <div class="section-header fade-in-up">
            <h2 class="section-title mono">The Cinematic Stage</h2>
            <p class="section-subtitle text-steel">Watch the engine transform visuals in real-time.</p>
          </div>
          
          <div class="video-container glass-stage fade-in-up">
            <!-- TikTok Embed -->
            <div class="tiktok-wrapper">
              <iframe 
                src="https://www.tiktok.com/embed/v2/7626041081494326549" 
                style="width: 100%; height: 700px; border: none;"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ CORE PILLARS ════ -->
      <section id="pillars" class="pillars-section">
        <div class="container">
          <div class="section-header fade-in-up">
            <h2 class="section-title mono">Built for Visual Intelligence</h2>
            <p class="section-subtitle text-steel">The 5 Pillars of the OmniLens Engine.</p>
          </div>
          
          <div class="pillars-grid">
            <div class="pillar-card glass-card">
              <div class="pillar-icon">👁️</div>
              <h3 class="mono">Visual Intelligence</h3>
              <p>Powered by Gemini 2.0 Flash for Intent Recognition and Spatial Grounding with pixel-perfect precision.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">🧠</div>
              <h3 class="mono">The AI Producer</h3>
              <p>Narrative synthesis that adapts to context—from analytical experts to warm, celebratory hosts.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">🎭</div>
              <h3 class="mono">Cinematic Stage</h3>
              <p>LERP-based transitions, physics-based atmospheres (smoke, digital rain), and interactive overlays.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">🗺️</div>
              <h3 class="mono">Adaptive Learning</h3>
              <p>Post-video "Deep Dives" that generate new insights from the same original image on the fly.</p>
            </div>

            <div class="pillar-card glass-card">
              <div class="pillar-icon">🎬</div>
              <h3 class="mono">Production Export</h3>
              <p>Native media recording pipeline for 30fps .webm or .mp4 social-ready distributions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ THE FLOW ════ -->
      <section id="flow" class="flow-section bg-surface">
        <div class="container">
          <div class="section-header fade-in-up">
            <h2 class="section-title mono">Turn "Looking" into "Watching"</h2>
            <p class="section-subtitle text-steel">The 4-step workflow to viral knowledge.</p>
          </div>
          
          <div class="flow-steps">
            <div class="step-item">
              <span class="step-num mono">01</span>
              <h4>Upload</h4>
              <p>Drop in any infographic, poster, or research paper.</p>
            </div>
            <div class="step-item">
              <span class="step-num mono">02</span>
              <h4>Analyze</h4>
              <p>Gemini maps the spatial hierarchy and writes the narrative script.</p>
            </div>
            <div class="step-item">
              <span class="step-num mono">03</span>
              <h4>Present</h4>
              <p>The Cinematic Stage begins its tour with smooth glides and effects.</p>
            </div>
            <div class="step-item">
              <span class="step-num mono">04</span>
              <h4>Record</h4>
              <p>Capture the output at 30fps and download your social-ready video.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ FINAL CALL ════ -->
      <section id="cta-final" class="final-cta-section">
        <div class="container">
          <h2 class="section-title mono">The Future of Content is Visual.</h2>
          <p class="section-subtitle text-steel">Be the first to control the engine.</p>
          
          <div class="hero-cta" style="margin-top: 4rem;">
            <button mat-flat-button color="primary" class="cta-btn" (click)="openDiscovery()">
              Secure Early Access
            </button>
            <button mat-stroked-button class="secondary-cta" (click)="openDiscovery()">
              View Built-in-Public Log
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { 
      display: block; 
      overflow-x: hidden; 
      background-color: #0a0a1a;
      color: #fff;
    }

    .landing-page {
      background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 100% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 40%);
    }

    .hero-section {
      min-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 4rem;
    }

    .omnilens-gradient-text {
      background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 12px rgba(255,255,255,0.1));
    }

    .hero-headline {
      font-size: 5rem;
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 2.5rem;
      letter-spacing: -0.02em;
      @media (max-width: 768px) { font-size: 3rem; }
    }

    .hero-subheadline {
      font-size: 1.5rem;
      max-width: 850px;
      margin: 0 auto 4rem;
      color: #94a3b8;
      line-height: 1.6;
      font-weight: 300;
    }

    .hero-cta {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      @media (max-width: 768px) { flex-direction: column; align-items: center; }
    }

    .cta-btn {
      background: #fff !important;
      color: #000 !important;
      padding: 0 2.5rem !important;
      height: 56px !important;
      font-weight: 700 !important;
      border-radius: 12px !important;
      transition: all 0.3s ease !important;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255,255,255,0.2);
    }

    .secondary-cta {
      border-color: rgba(255, 255, 255, 0.2) !important;
      color: #fff !important;
      padding: 0 2.5rem !important;
      height: 56px !important;
      border-radius: 12px !important;
      backdrop-filter: blur(8px);
    }

    .section-header { margin-bottom: 5rem; text-align: center; }
    .section-title { font-size: 3rem; margin-bottom: 1rem; color: #fff; font-weight: 700; }
    .section-subtitle { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.4em; color: #64748b; }

    /* Cinematic Stage / Video */
    .cinema-section { padding: 8rem 0; }
    .glass-stage {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 32px;
      padding: 2rem;
      backdrop-filter: blur(24px);
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
      max-width: 800px;
      margin: 0 auto;
    }

    /* Pillars Grid */
    .pillars-section { padding: 8rem 0; }
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .pillar-card {
      padding: 3rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
      backdrop-filter: blur(12px);
    }

    .pillar-card:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-8px);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .pillar-icon { font-size: 2.5rem; margin-bottom: 1.5rem; }
    .pillar-card h3 { font-size: 1.25rem; margin-bottom: 1rem; color: #fff; }
    .pillar-card p { color: #94a3b8; line-height: 1.7; font-size: 1rem; }

    /* Flow Section */
    .flow-section { padding: 8rem 0; background: rgba(0,0,0,0.2); }
    .flow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 3rem;
    }

    .step-item {
      text-align: center;
      .step-num {
        font-size: 0.8rem;
        color: #3b82f6;
        display: block;
        margin-bottom: 1rem;
      }
      h4 { font-size: 1.5rem; margin-bottom: 1rem; color: #fff; }
      p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }
    }

    /* Final CTA */
    .final-cta-section { padding: 10rem 0; text-align: center; }

    .fade-in-up {
      animation: fadeInUp 1.2s cubic-bezier(0.2, 0, 0.2, 1) forwards;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .bg-deep { background: #050510; }
    .bg-surface { background: #0a0a1a; }
  `]
})
export class LandingComponent {
  private dialog = inject(MatDialog);

  openDiscovery() {
    this.dialog.open(DiscoveryDialogComponent, {
      width: '500px',
      maxWidth: '95vw'
    });
  }
}


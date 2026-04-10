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
            OmniLens is the professional <strong>AI-Driven Video Production Suite</strong> that transforms static visuals—infographics, posters, and research—into cinematic narrated guided tours.
          </p>
          <div class="hero-cta">
            <button mat-flat-button color="primary" class="cta-btn" (click)="launchApp()">
              Launch OmniLens
              <mat-icon>rocket_launch</mat-icon>
            </button>
            <button mat-stroked-button class="secondary-cta" (click)="launchApp()">
              Explore the Engine
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
            <h2 class="section-title mono">Visual Intelligence 2.0</h2>
            <p class="section-subtitle text-steel">Deep grounding and narrative synchronization.</p>
          </div>
          
          <div class="pillars-grid">
            <div class="pillar-card glass-card">
              <div class="pillar-icon">👁️</div>
              <h3 class="mono">Spatial Grounding</h3>
              <p>Gemini 2.0 Flash provides "Visual Evidence" for every claim, identifying the exact text or graphic element referenced.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">📝</div>
              <h3 class="mono">Synchronized Scripting</h3>
              <p>Generate professional narration scripts that align perfectly with the spatial hierarchy of your content.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">🎭</div>
              <h3 class="mono">Physics-Based Moods</h3>
              <p>Dynamic atmospheric effects (digital rain, smoke, sparkles) that adapt to the "Physics Context" of your story.</p>
            </div>
            
            <div class="pillar-card glass-card">
              <div class="pillar-icon">🚀</div>
              <h3 class="mono">Zoneless Performance</h3>
              <p>Built on Angular 21 with a zoneless architecture and Signals for ultra-fast, reactive UI responsiveness.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ ADVANCED CAPABILITIES ════ -->
      <section id="capabilities" class="capabilities-section bg-surface">
        <div class="container">
          <div class="capabilities-grid">
            <div class="capability-item glass-card">
              <h4 class="mono">PROFESSIONAL BRANDING</h4>
              <p>Upload your own logo and branding settings. OmniLens saves them to your Firestore profile and applies them to every project, including the final Credits Scene.</p>
            </div>
            <div class="capability-item glass-card">
              <h4 class="mono">ABSOLUTE CONTROL</h4>
              <p>Navigate with precision using the new Interactive Scrubber, segment-based jumping, and 2-second seeking via keyboard shortcuts.</p>
            </div>
            <div class="capability-item glass-card">
              <h4 class="mono">TECHNICAL RESILIENCE</h4>
              <p>Our robust <code>withRetry</code> mechanism handles Gemini API rate limits automatically, ensuring your production suite never sleeps.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ════ FINAL CALL ════ -->
      <section id="cta-final" class="final-cta-section">
        <div class="container">
          <h2 class="section-title mono">Experience the AI Director.</h2>
          <p class="section-subtitle text-steel">Your data has a story. Tell it with OmniLens.</p>
          
          <div class="hero-cta" style="margin-top: 4rem;">
            <button mat-flat-button color="primary" class="cta-btn" (click)="launchApp()">
              Launch App
              <mat-icon>open_in_new</mat-icon>
            </button>
            <button mat-stroked-button class="secondary-cta" (click)="openDiscovery()">
              Request a Pilot
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
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
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

    .pillars-section { padding: 8rem 0; }
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

    .capabilities-section { padding: 8rem 0; }
    .capabilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .capability-item {
      padding: 3rem;
      text-align: left;
      h4 { font-size: 1rem; margin-bottom: 1.5rem; color: #3b82f6; letter-spacing: 0.1em; }
      p { color: #94a3b8; font-size: 1rem; line-height: 1.8; }
    }

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


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SovereignDiagramComponent } from '../../core/components/sovereign-diagram.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SovereignDiagramComponent],
  template: `
    <div class="landing-container">
      <!-- ════ HERO SECTION ════ -->
      <section id="hero" class="hero fade-in">
        <div class="hero-content">
          <div class="tags-row">
            <span class="tech-tag mono">● NVIDIA NemoClaw • OpenShell • POPIA-Ready</span>
          </div>

          <div class="status-badge">
            <span class="status-dot"></span>
            <span class="mono label">ACTIVE IMPLEMENTATION</span>
            <span class="v-details mono">Nemotron-3 • Sovereign AI</span>
          </div>

          <h1 class="hero-title">
            Enterprise AI Deployment.<br>
            <span class="vault-gradient-text glow">Hardened by NemoClaw.</span>
          </h1>
          
          <p class="hero-subtitle italic">
            We bridge the gap between high-level reasoning and corporate data safety.
          </p>

          <div class="cta-row">
            <a [href]="whatsappLink" class="btn-primary-pill mono">
              Book On-Site Demo
            </a>
          </div>
        </div>
      </section>

      <!-- ════ THE SOVEREIGN CONDUIT (OVERVIEW) ════ -->
      <section id="overview" class="section overview-section fade-in">
        <div class="overview-content glass">
          <h2 class="mono accent-emerald">THE SOVEREIGN CONDUIT</h2>
          <p class="description">
            We implement the NVIDIA NemoClaw stack on your local hardware. 
            High-intelligence inference with an encrypted, POPIA-ready privacy router.
          </p>
          
          <!-- Architecture Diagram with Defer -->
          @defer (on viewport) {
            <app-sovereign-diagram></app-sovereign-diagram>
          } @placeholder {
            <div class="diagram-placeholder mono">LOADING SECURE ARCHITECTURE...</div>
          }
        </div>
      </section>

      <!-- ════ HIGHLIGHTS (BENEFITS) ════ -->
      <section id="why" class="section">
        <div class="grid">
          <div class="card glass hover-grow" *ngFor="let benefit of benefits">
            <div class="icon">{{ benefit.icon }}</div>
            <h3 class="mono highlight-title">{{ benefit.title }}</h3>
            <p class="highlight-desc">{{ benefit.description }}</p>
          </div>
        </div>
      </section>

      <!-- ════ PRICING SECTION ════ -->
      <section id="pricing" class="section pricing-section">
        <div class="pricing-card glass">
          <div class="section-label mono">FLAT-RATE IMPLEMENTATION</div>
          <h2 class="pricing-fee vault-gradient-text">R2,500</h2>
          <div class="pricing-label mono">Audit • Launch • Briefing</div>
          <ul class="pricing-list">
            <li *ngFor="let item of inclusions">
              <span class="check">✓</span> {{ item }}
            </li>
          </ul>
          <a [href]="whatsappLink" class="btn-primary-pill mono">
            Secure Implementation
          </a>
        </div>
      </section>

      <!-- Mobile FAB -->
      <a [href]="whatsappLink" class="mobile-fab glass fab-fade mono">
        BOOK DEMO
      </a>
    </div>
  `,
  styles: [`
    .landing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    section { padding: 6rem 0; }

    .hero {
      padding: 6rem 1rem 4rem;
      text-align: center;
    }

    .hero-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .tech-tag {
      display: inline-block;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.4rem 1.2rem;
      border-radius: 2rem;
      font-size: 0.7rem;
      color: var(--vault-accent);
      background: rgba(16, 185, 129, 0.05);
      margin-bottom: 1.5rem;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      border: 1px solid var(--vault-accent);
      padding: 0.4rem 1.25rem;
      border-radius: 0.75rem;
      margin-bottom: 2.5rem;
      background: rgba(16, 185, 129, 0.05);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--vault-accent);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--vault-accent);
    }

    .hero-title {
      font-size: clamp(2.5rem, 8vw, 5rem);
      line-height: 1;
      margin-bottom: 2rem;
      font-weight: 800;
    }

    .glow {
      text-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
    }

    .hero-subtitle {
      font-size: 1.4rem;
      color: var(--vault-muted);
      margin: 0 auto 3rem;
      max-width: 800px;
      line-height: 1.6;
    }

    .overview-content {
      padding: 4rem 2rem;
      border-radius: 2rem;
      text-align: center;
    }

    .overview-content h2 {
      font-size: 1.5rem;
      letter-spacing: 0.3em;
      margin-bottom: 2rem;
    }

    .overview-content .description {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      color: var(--vault-muted);
      line-height: 1.6;
    }

    .diagram-placeholder {
      padding: 6rem;
      color: var(--vault-muted);
      font-size: 0.8rem;
      letter-spacing: 0.2em;
    }

    .highlight-title {
      font-size: 1.25rem;
      color: white;
      margin-bottom: 1rem;
    }

    .highlight-desc {
      color: var(--vault-muted);
      line-height: 1.6;
      font-size: 1rem;
    }

    .cta-row { margin-top: 2rem; }

    .btn-primary-pill {
      background: var(--vault-accent);
      color: var(--vault-bg);
      padding: 1.1rem 3rem;
      border-radius: 6rem;
      text-decoration: none;
      font-weight: 800;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      box-shadow: 0 5px 20px rgba(16, 185, 129, 0.3);
      display: inline-block;
    }

    .btn-primary-pill:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .card { padding: 3rem; border-radius: 1.5rem; }
    .icon { font-size: 2.5rem; margin-bottom: 1.5rem; }

    .pricing-card {
      max-width: 550px;
      width: 100%;
      padding: 5rem 2rem;
      border-radius: 2rem;
      margin: 0 auto;
      text-align: center;
    }

    .pricing-fee { font-size: 6rem; margin-bottom: 0.5rem; }
    .pricing-label { color: var(--vault-muted); font-size: 0.9rem; margin-bottom: 3rem; letter-spacing: 0.1em; }
    
    .pricing-list {
      list-style: none;
      padding: 0;
      margin: 0 0 4rem;
      text-align: left;
      display: inline-block;
    }

    .pricing-list li {
      margin-bottom: 1.25rem;
      font-size: 1.1rem;
      display: flex;
      gap: 1rem;
    }

    .check { color: var(--vault-accent); font-weight: 900; }

    /* Mobile FAB */
    .mobile-fab {
      display: none;
      position: fixed;
      bottom: 2rem;
      right: 1.5rem;
      padding: 1rem 1.5rem;
      border-radius: 5rem;
      background: var(--vault-accent);
      color: var(--vault-bg);
      font-weight: 900;
      font-size: 0.8rem;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
      z-index: 1001;
      border: 1px solid rgba(255,255,255,0.2);
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in { animation: fadeInUp 1s ease-out forwards; }

    @media (max-width: 768px) {
      .mobile-fab { display: block; }
      .hero-title { font-size: 2.5rem; }
      .pricing-fee { font-size: 4rem; }
      .hero { padding-top: 4rem; }
    }
  `]
})
export class LandingComponent {
  whatsappLink = 'https://wa.me/27827583593?text=I%20would%20like%20to%20book%20an%20on-site%20demo%20for%20NVIDIA%20NemoClaw.';

  benefits = [
    {
      icon: '🧠',
      title: '1M Token Context',
      description: 'Analyze years of complex legal or financial records instantly.'
    },
    {
      icon: '🛡️',
      title: 'OpenShell Sandbox',
      description: 'Your enterprise data remains "caged" and isolated on local silicon.'
    },
    {
      icon: '⚡',
      title: 'Active Execution',
      description: 'Agents that perform verifiable work across local infrastructure.'
    }
  ];

  inclusions = [
    'Complete Site Audit',
    'NemoClaw Environment Launch',
    'Enterprise Staff Briefing'
  ];
}

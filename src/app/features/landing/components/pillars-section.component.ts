import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pillars-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="pillars fade-in">
      <h2 class="title">What We Do</h2>
      <div class="grid">
        <article class="pillar hover-grow">
          <h3>AI Consulting & Developer Services</h3>
          <p>We help businesses adopt AI, automate workflows, and build internal tools.</p>
        </article>
        <article class="pillar hover-grow">
          <h3>Media & Storytelling</h3>
          <p>AI-powered videos, 82ndrop workflows, BananaBoard storyboards.</p>
        </article>
        <article class="pillar hover-grow">
          <h3>Education & Tools</h3>
          <p>Quranic Arabic, coding tools, MCP agents, AI learning.</p>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      .pillars { padding: 0.5rem 1rem 1rem; }
      .title { margin: 0 0 0.75rem 0; color: var(--tjr-sand); }
      .grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      .pillar {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 1rem;
      }
      .pillar h3 { margin: 0 0 0.5rem 0; color: #fff; }
      .pillar p { margin: 0 0 0.75rem 0; color: #d9d9d9; }
    `,
  ],
})
export class PillarsSectionComponent {}

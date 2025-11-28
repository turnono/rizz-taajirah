import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'pillars-section',
  standalone: true,
  imports: [CommonModule, IonButton],
  template: `
    <section class="pillars fade-in">
      <h2 class="title">What We Do</h2>
      <div class="grid">
        <article class="pillar hover-grow">
          <div class="icon-container">
            <div class="pillar-icon">🤖</div>
          </div>
          <h3>AI Consulting & Developer Services</h3>
          <p>We help businesses adopt AI, automate workflows, and build internal tools.</p>
          <ion-button fill="outline" class="learn-more-btn" (click)="navigateToContact()">
            Learn More
          </ion-button>
        </article>
        <article class="pillar hover-grow">
          <div class="icon-container">
            <div class="pillar-icon">🎬</div>
          </div>
          <h3>Media & Storytelling</h3>
          <p>AI-powered videos, 82ndrop workflows, BananaBoard storyboards.</p>
          <ion-button fill="outline" class="learn-more-btn" (click)="navigateToAITools()">
            Learn More
          </ion-button>
        </article>
        <article class="pillar hover-grow">
          <div class="icon-container">
            <div class="pillar-icon">📚</div>
          </div>
          <h3>Education & Tools</h3>
          <p>Quranic Arabic, coding tools, MCP agents, AI learning.</p>
          <ion-button fill="outline" class="learn-more-btn" (click)="navigateToAITools()">
            Learn More
          </ion-button>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      .pillars { 
        padding: 2rem 1.5rem; 
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .title { 
        margin: 0 0 2rem 0; 
        color: var(--tjr-bronze);
        font-size: 2rem;
        text-align: center;
      }
      
      .grid { 
        display: grid; 
        gap: 1.5rem; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      }
      
      .pillar {
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(192, 125, 62, 0.3);
        border-radius: 12px;
        padding: 2rem 1.5rem;
        backdrop-filter: blur(8px);
        transition: transform 0.2s ease, border-color 0.2s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 320px;
      }
      
      .pillar:hover {
        border-color: rgba(192, 125, 62, 0.6);
        transform: translateY(-4px);
      }
      
      .icon-container {
        text-align: center;
        margin-bottom: 1.5rem;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .pillar-icon {
        font-size: 3.5rem;
        line-height: 1;
      }
      
      .pillar h3 { 
        margin: 0 0 1rem 0; 
        color: var(--tjr-bronze);
        font-size: 1.4rem;
        text-align: center;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .pillar p { 
        margin: 0 0 2rem 0; 
        color: #e0e0e0;
        line-height: 1.6;
        text-align: center;
        flex-grow: 1;
        font-size: 1rem;
      }
      
      .learn-more-btn {
        --border-color: var(--tjr-bronze);
        --color: var(--tjr-bronze);
        width: 100%;
        margin-top: auto;
      }
      
      .learn-more-btn:hover {
        --background: rgba(192, 125, 62, 0.1);
      }
      
      @media screen and (max-width: 768px) {
        .pillars {
          padding: 1.5rem 1rem;
        }
        
        .title {
          font-size: 1.75rem;
        }
        
        .grid {
          grid-template-columns: 1fr;
        }
        
        .pillar {
          min-height: auto;
        }
        
        .pillar h3 {
          height: auto;
          margin-bottom: 0.5rem;
        }
      }
    `,
  ],
})
export class PillarsSectionComponent {
  constructor(private router: Router) {}

  navigateToContact() {
    this.router.navigate(['contact']);
  }

  navigateToAITools() {
    // Scroll to AI tools section
    const element = document.getElementById('ai-tools');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

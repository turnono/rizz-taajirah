import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonBadge } from '@ionic/angular/standalone';
import { SeoService } from '../../core/services/seo.service';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonBadge],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>MCP Showcase</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>7‑Place Timekeeper MCP</h1>
      <p>Ultra‑precise timekeeping exposed via the Model Context Protocol for agents, labs, and developers.</p>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Smotary.ai — 7‑Place Timekeeper MCP</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Features:</p>
          <ul>
            <li>7‑decimal precision timestamps</li>
            <li>Duration math and human context tools</li>
            <li>SDK / IDE support via MCP clients</li>
          </ul>
          <ion-button fill="solid" color="success" (click)="openSmotary()">Explore on Smotary.ai →</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>7pace Timetracker MCP (Azure DevOps)</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Log, query, update, and report time entries through MCP tools. Your listing:</p>
          <div class="cta-row">
            <ion-button (click)="openSevenpaceGitHub()">GitHub →</ion-button>
            <ion-button (click)="openSevenpaceSmithery()">Smithery →</ion-button>
          </div>
          <ion-badge color="medium">MCP</ion-badge>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    .cta-row { display: flex; gap: 0.5rem; }
  `]
})
export class McpComponent {
  constructor(private seo: SeoService, private analytics: AnalyticsService) {
    this.seo.updateMetaTags({
      title: 'MCP Showcase – 7‑Place Timekeeper & 7pace Timetracker',
      description: 'Explore Taajirah MCP offerings: 7‑Place Timekeeper (Smotary.ai) and 7pace Timetracker MCP for Azure DevOps.',
      keywords: 'MCP, Model Context Protocol, timekeeper, sevenpace, Azure DevOps, Smotary, Taajirah'
    });
  }

  openSmotary() {
    this.analytics.trackEvent('platform_visit', 'navigation', 'smotary_mcp_showcase');
    window.open('https://smotary.ai', '_blank', 'noopener');
  }

  openSevenpaceGitHub() {
    this.analytics.trackExternalClick('https://github.com/turnono/7pace-mcp-server', '7pace MCP GitHub');
    window.open('https://github.com/turnono/7pace-mcp-server', '_blank', 'noopener');
  }

  openSevenpaceSmithery() {
    this.analytics.trackExternalClick('https://smithery.ai/server/@turnono/sevenpace-mcp-server', '7pace MCP Smithery');
    window.open('https://smithery.ai/server/@turnono/sevenpace-mcp-server', '_blank', 'noopener');
  }
}

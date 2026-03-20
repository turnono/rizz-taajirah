import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-futuristic-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="background-container">
      <div class="grid-layer"></div>
      <div class="glow-layer"></div>
      <div class="scanlines"></div>
      <div class="noise"></div>
      <div class="particles">
        <div *ngFor="let p of particles" 
             class="particle" 
             [style.left.%]="p.x" 
             [style.top.%]="p.y" 
             [style.opacity]="p.opacity"
             [style.animation-delay]="p.delay">
          {{ p.char }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      pointer-events: none;
      background: #0b0f1a;
      overflow: hidden;
    }

    .background-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .grid-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .glow-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
    }

    .scanlines {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(16, 185, 129, 0.02) 50%,
        transparent 50%
      );
      background-size: 100% 4px;
      z-index: 1;
    }

    .noise {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('https://grainy-gradients.vercel.app/noise.svg');
      opacity: 0.1;
      z-index: 2;
    }

    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .particle {
      position: absolute;
      color: var(--vault-accent);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      user-select: none;
      animation: float 25s linear infinite;
    }

    @keyframes float {
      0% { transform: translateY(0); opacity: 0; }
      10% { opacity: 0.2; }
      90% { opacity: 0.2; }
      100% { transform: translateY(-100vh); opacity: 0; }
    }
  `]
})
export class FuturisticBackgroundComponent implements OnInit {
  particles: any[] = [];
  chars = ['Σ', 'λ', 'Ω', '∫', '∆', 'π', '∞', '0', '1'];

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        char: this.chars[Math.floor(Math.random() * this.chars.length)],
        opacity: Math.random() * 0.2 + 0.05,
        delay: (Math.random() * 25) + 's'
      });
    }
  }
}

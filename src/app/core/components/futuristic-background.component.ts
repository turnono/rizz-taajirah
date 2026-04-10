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
      <div class="vignette"></div>
      <div class="noise"></div>
      <div class="particles">
        <div *ngFor="let p of particles" 
             class="particle" 
             [style.left.%]="p.x" 
             [style.top.%]="p.y" 
             [style.opacity]="p.opacity"
             [style.animation-delay]="p.delay"
             [style.font-size.rem]="p.size">
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
      background: #05050a;
      overflow: hidden;
    }

    .background-container {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: heartbeat 8s ease-in-out infinite;
    }

    .grid-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
      background-size: 100px 100px;
      mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
    }

    .glow-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%);
    }

    .vignette {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%);
    }

    .scanlines {
      position: absolute;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 5;
    }

    .noise {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('https://grainy-gradients.vercel.app/noise.svg');
      opacity: 0.12;
      z-index: 2;
      mix-blend-mode: overlay;
    }

    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .particle {
      position: absolute;
      color: #3b82f6;
      font-family: monospace;
      user-select: none;
      filter: blur(0.5px);
      animation: drift 30s linear infinite;
    }

    @keyframes drift {
      from { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.4; }
      90% { opacity: 0.4; }
      to { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }

    @keyframes heartbeat {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.02); }
    }
  `]
})
export class FuturisticBackgroundComponent implements OnInit {
  particles: any[] = [];
  chars = ['Σ', 'λ', 'Ω', '∫', '∆', 'π', '∞', '0', '1', 'Ξ', 'Ψ', 'Φ', 'Γ', 'Θ'];

  ngOnInit() {
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        char: this.chars[Math.floor(Math.random() * this.chars.length)],
        opacity: Math.random() * 0.3 + 0.05,
        delay: (Math.random() * 30) + 's',
        size: Math.random() * 0.5 + 0.4
      });
    }
  }
}

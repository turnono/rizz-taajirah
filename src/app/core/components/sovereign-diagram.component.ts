import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sovereign-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="diagram-host glass fade-in">
      <div class="diagram-container">
        <!-- 1. Office Data -->
        <div class="node-group source">
          <div class="node mono blue-node">OFFICE DATA</div>
          <div class="sub-label mono">Local Enterprise Storage</div>
        </div>

        <div class="connector">
          <div class="line blue-line"></div>
          <div class="arrow blue-arrow"></div>
        </div>

        <!-- 2. OpenShell Sandbox -->
        <div class="node-group sandbox">
          <div class="node mono accent-node">OPENSHELL SANDBOX</div>
          <div class="sub-label mono">Privacy-Caged Execution</div>
        </div>

        <div class="connector">
          <div class="line accent-line"></div>
          <div class="arrow accent-arrow"></div>
        </div>

        <!-- 3. NemoClaw Router -->
        <div class="node-group router">
          <div class="node mono accent-node glow-node">NEMOCLAW ROUTER</div>
          <div class="sub-label mono">Encrypted POPIA Bridge</div>
        </div>

        <div class="connector">
          <div class="line tunnel-line">
            <div class="lock">🔒</div>
          </div>
          <div class="arrow accent-arrow"></div>
        </div>

        <!-- 4. Nemotron-3 Cloud -->
        <div class="node-group cloud">
          <div class="node mono cloud-node">NEMOTRON-3 CLOUD</div>
          <div class="sub-label mono">High-Inference Intelligence</div>
        </div>

        <div class="architecture-label mono">THE SOVEREIGN CONDUIT ARCHITECTURE — TAAJIRAH SYSTEMS</div>
      </div>
    </div>
  `,
  styles: [`
    .diagram-host {
      margin: 4rem auto;
      padding: 4rem 2rem;
      border-radius: 1.5rem;
      max-width: 1000px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .diagram-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding-bottom: 2rem;
    }

    .node-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      z-index: 2;
    }

    .node {
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      border: 1px solid var(--vault-border);
      background: rgba(15, 23, 42, 0.8);
      white-space: nowrap;
    }

    .sub-label {
      font-size: 0.6rem;
      color: var(--vault-muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .blue-node { border-color: #3b82f6; color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
    .accent-node { border-color: var(--vault-accent); color: var(--vault-accent); }
    .glow-node { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
    .cloud-node { border-style: dashed; opacity: 0.8; }

    .connector {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      min-width: 40px;
    }

    .line {
      width: 100%;
      height: 2px;
      background: var(--vault-border);
    }

    .blue-line { background: #3b82f6; opacity: 0.5; }
    .accent-line { background: var(--vault-accent); opacity: 0.5; }
    
    .tunnel-line {
      background: repeating-linear-gradient(
        90deg,
        var(--vault-accent),
        var(--vault-accent) 10px,
        transparent 10px,
        transparent 20px
      );
      height: 3px;
    }

    .lock {
      position: absolute;
      top: -1.2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
    }

    .arrow {
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 8px solid var(--vault-border);
      position: absolute;
      right: -2px;
    }

    .blue-arrow { border-left-color: #3b82f6; }
    .accent-arrow { border-left-color: var(--vault-accent); }

    .architecture-label {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.65rem;
      color: var(--vault-muted);
      letter-spacing: 0.2em;
      opacity: 0.4;
    }

    @media (max-width: 900px) {
      .diagram-container { 
        flex-direction: column; 
        gap: 2.5rem; 
        padding-bottom: 4rem;
      }
      .connector { transform: rotate(90deg); width: 40px; }
      .lock { transform: rotate(-90deg) translateY(-10px); }
      .architecture-label {
        position: relative;
        bottom: auto;
        left: auto;
        transform: none;
        margin-top: 3rem;
        text-align: center;
        width: 100%;
      }
    }
  `]
})
export class SovereignDiagramComponent {}

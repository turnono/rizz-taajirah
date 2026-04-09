import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sovereign-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="diagram-host vault-glass-card fade-in">
      <div class="diagram-container">
        <!-- 1. Ledger + Hold State -->
        <div class="node-group source">
          <div class="node mono blue-node">LEDGER + HOLD STATE</div>
          <div class="sub-label mono">Immutable Audit Trail</div>
        </div>

        <div class="connector">
          <div class="line blue-line"></div>
          <div class="arrow blue-arrow"></div>
        </div>

        <!-- 2. Operator Oversight -->
        <div class="node-group oversight">
          <div class="node mono accent-node">OPERATOR OVERSIGHT</div>
          <div class="sub-label mono">Administrative Review</div>
        </div>

        <div class="connector">
          <div class="line accent-line"></div>
          <div class="arrow accent-arrow"></div>
        </div>

        <!-- 3. Runtime Gateway -->
        <div class="node-group gateway">
          <div class="node mono accent-node glow-node">RUNTIME GATEWAY</div>
          <div class="sub-label mono">Enforcement & Metering</div>
        </div>

        <div class="connector">
          <div class="line tunnel-line">
            <div class="lock">🔒</div>
          </div>
          <div class="arrow accent-arrow"></div>
        </div>

        <!-- 4. Distributed Agents -->
        <div class="node-group cloud">
          <div class="node mono cloud-node">AGENTIC WORKLOADS</div>
          <div class="sub-label mono">Production Execution</div>
        </div>

        <div class="architecture-label mono">SENTINEL CONTROL FLOW — TAAJIRAH SYSTEMS</div>
      </div>
    </div>
  `,
  styles: [`
    .diagram-host {
      margin: 4rem auto;
      padding: 5rem 3rem;
      max-width: 1100px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; height: 1px;
        background: linear-gradient(90deg, transparent, var(--sentinel-blue), transparent);
        opacity: 0.3;
      }
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
      gap: 1rem;
      z-index: 2;
    }

    .node {
      padding: 1rem 1.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.9);
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .sub-label {
      font-size: 0.65rem;
      color: var(--steel);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .blue-node { border-color: var(--sentinel-blue); color: var(--sentinel-blue); background: rgba(59, 130, 246, 0.05); }
    .accent-node { border-color: var(--sentinel-blue); color: #fff; }
    .glow-node { 
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); 
      border-color: #60a5fa;
    }
    .cloud-node { 
      border-style: dashed; 
      opacity: 0.9; 
      border-color: rgba(255,255,255,0.2);
    }

    .connector {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
      min-width: 60px;
    }

    .line {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    .blue-line { background: var(--sentinel-blue); opacity: 0.4; }
    .accent-line { background: #60a5fa; opacity: 0.4; }
    
    .tunnel-line {
      background: repeating-linear-gradient(
        90deg,
        var(--sentinel-blue),
        var(--sentinel-blue) 10px,
        transparent 10px,
        transparent 20px
      );
      height: 2px;
      opacity: 0.6;
    }

    .lock {
      position: absolute;
      top: -1.4rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.9rem;
      filter: grayscale(1) opacity(0.7);
    }

    .arrow {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 6px solid rgba(255, 255, 255, 0.2);
      position: absolute;
      right: -2px;
    }

    .blue-arrow { border-left-color: var(--sentinel-blue); }
    .accent-arrow { border-left-color: #60a5fa; }

    .architecture-label {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      color: var(--steel);
      letter-spacing: 0.3em;
      opacity: 0.4;
      white-space: nowrap;
    }

    @media (max-width: 900px) {
      .diagram-host { padding: 4rem 2rem; }
      .diagram-container { 
        flex-direction: column; 
        gap: 3rem; 
        padding-bottom: 4rem;
      }
      .connector { transform: rotate(90deg); width: 40px; height: 40px; justify-content: center; }
      .lock { transform: rotate(-90deg) translateY(-12px); }
      .architecture-label {
        position: relative;
        bottom: auto;
        left: auto;
        transform: none;
        margin-top: 4rem;
        text-align: center;
        width: 100%;
      }
    }
  `]
})
export class SovereignDiagramComponent {}

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="hub-root">

      <!-- ═══════════════════ NAVBAR ═══════════════════ -->
      <nav class="navbar" [class.scrolled]="isScrolled">
        <div class="nav-inner">
          <div class="nav-brand">
            <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="brand-logo">
            <div class="brand-text">
              <span class="brand-name">TAAJIRAH SYSTEMS</span>
              <span class="brand-sub">Sovereign Infrastructure Architects</span>
            </div>
          </div>
          <div class="nav-links desktop-nav">
            <button class="nav-link" (click)="scroll('barrier')">Security</button>
            <button class="nav-link" (click)="scroll('auditor')">Auditor</button>
            <button class="nav-link" (click)="scroll('certificate')">Certificates</button>
            <button class="nav-link" (click)="scroll('popia')">POPIA</button>
            <button class="nav-cta" (click)="scroll('cta')">Request White Paper</button>
          </div>
          <button class="hamburger" (click)="toggleMenu()" [class.open]="menuOpen" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" [class.open]="menuOpen">
          <button (click)="scroll('barrier')">Security</button>
          <button (click)="scroll('auditor')">Auditor</button>
          <button (click)="scroll('certificate')">Certificates</button>
          <button (click)="scroll('popia')">POPIA</button>
          <button (click)="scroll('cta')" class="mobile-cta">Request White Paper</button>
        </div>
      </nav>

      <!-- ═══════════════════ HERO ═══════════════════ -->
      <section class="hero">
        <div class="hero-grid-bg"></div>
        <div class="hero-glow"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            NVIDIA NemoClaw · OpenClaw · macOS Seatbelt
          </div>
          <div class="prod-badge-strip">
            <span class="prod-badge">🟢 PRODUCTION RELEASE</span>
            <span class="prod-version">Hub_v2.5_Master.dmg · 17.5 GB</span>
          </div>
          <h1 class="hero-headline">
            Sovereign AI.<br>
            <span class="accent-green">Hardware-Level Privacy.</span>
          </h1>
          <p class="hero-sub">
            The first kernel-hardened AI system for South African Law &amp; Finance.<br>
            <strong>100% Local. No Cloud. No Leaks.</strong>
          </p>
          <div class="sha-seal">
            <span class="sha-label">SHA-256 INTEGRITY SEAL</span>
            <span class="sha-hash">62391ad564fb190d75acdb6141932f5d26c09f1f67f51749f879d36014911cd0</span>
          </div>

          <!-- SVG SECURITY ARCHITECTURE DIAGRAM -->
          <div class="arch-diagram-wrap">
            <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" class="arch-svg">
              <defs>
                <filter id="green-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <!-- Kernel Seatbelt border -->
              <rect x="185" y="50" width="270" height="160" rx="14"
                    fill="rgba(0,255,136,0.04)" stroke="#00ff88" stroke-width="1.8"
                    stroke-dasharray="7 3" filter="url(#green-glow)"/>
              <text x="320" y="38" text-anchor="middle" fill="#00ff88"
                    font-family="JetBrains Mono, monospace" font-size="9.5" letter-spacing="1.8" font-weight="600">
                KERNEL SEATBELT / SANDBOX-EXEC
              </text>

              <!-- Hub Core box -->
              <rect x="232" y="82" width="176" height="96" rx="10"
                    fill="#060f1a" stroke="#00ff88" stroke-width="1.5" filter="url(#green-glow)"/>
              <text x="320" y="116" text-anchor="middle" fill="#00ff88"
                    font-family="JetBrains Mono, monospace" font-size="12.5" font-weight="800" letter-spacing="1">
                THE HUB V2.5
              </text>
              <text x="320" y="133" text-anchor="middle" fill="#00ff88"
                    font-family="JetBrains Mono, monospace" font-size="12.5" font-weight="800" letter-spacing="1">
                CORE
              </text>
              <text x="320" y="154" text-anchor="middle" fill="#3a6a7a"
                    font-family="JetBrains Mono, monospace" font-size="8">
                NemoClaw • OpenClaw • Seatbelt
              </text>

              <!-- 10Gb Ethernet line from left -->
              <rect x="8" y="116" width="68" height="28" rx="5"
                    fill="#060f1a" stroke="#00bfff" stroke-width="1.2"/>
              <text x="42" y="126" text-anchor="middle" fill="#00bfff"
                    font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">WIRED</text>
              <text x="42" y="137" text-anchor="middle" fill="#00bfff"
                    font-family="JetBrains Mono, monospace" font-size="7">INPUT</text>
              <line x1="76" y1="130" x2="230" y2="130" stroke="#00bfff" stroke-width="2"/>
              <polygon points="230,124 230,136 244,130" fill="#00bfff"/>
              <text x="150" y="120" text-anchor="middle" fill="#00bfff"
                    font-family="JetBrains Mono, monospace" font-size="9" font-weight="600">10Gb ETHERNET</text>

              <!-- Blocked cloud connection line (red dashed) -->
              <line x1="456" y1="130" x2="564" y2="130" stroke="#ff4a4a" stroke-width="2"
                    stroke-dasharray="5 3"/>

              <!-- X circle block -->
              <circle cx="502" cy="130" r="16" fill="#0a0505" stroke="#ff4a4a" stroke-width="1.8"
                      filter="url(#red-glow)"/>
              <line x1="493" y1="121" x2="511" y2="139" stroke="#ff4a4a" stroke-width="2.5"/>
              <line x1="511" y1="121" x2="493" y2="139" stroke="#ff4a4a" stroke-width="2.5"/>

              <!-- Cloud shape (right, blocked) -->
              <ellipse cx="596" cy="138" rx="40" ry="24" fill="#120505" stroke="#ff4a4a" stroke-width="1.2"/>
              <ellipse cx="578" cy="124" rx="20" ry="15" fill="#120505" stroke="#ff4a4a" stroke-width="1.2"/>
              <ellipse cx="608" cy="121" rx="18" ry="14" fill="#120505" stroke="#ff4a4a" stroke-width="1.2"/>
              <text x="596" y="142" text-anchor="middle" fill="#ff4a4a"
                    font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700">CLOUD AI</text>
              <text x="596" y="155" text-anchor="middle" fill="#ff4a4a"
                    font-family="JetBrains Mono, monospace" font-size="7.5">BLOCKED</text>

              <!-- Bottom label -->
              <text x="320" y="240" text-anchor="middle" fill="#2a4a5a"
                    font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1.5">
                SOVEREIGN ISOLATION ARCHITECTURE — HUB V2.5 PRODUCTION
              </text>
            </svg>
          </div>

          <div class="hero-ctas">
            <button class="btn-primary" (click)="scroll('cta')">Request Technical White Paper</button>
            <button class="btn-secondary" (click)="scroll('demo')">Book a 15-Min Demo · Joburg</button>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ TRUST BAR ═══════════════════ -->
      <div class="trust-bar">
        <div class="trust-inner">
          <div class="trust-badge" *ngFor="let b of trustBadges">
            <span class="trust-icon">{{ b.icon }}</span>
            <span>{{ b.label }}</span>
          </div>
        </div>
      </div>

      <!-- ═══════ LIVE VERIFICATION ═══════ -->
      <section class="section verify-section" id="verify">
        <div class="section-inner">
          <div class="section-label">LIVE KERNEL VERIFICATION</div>
          <h2 class="section-title">Physical Proof.<br><span class="accent-green">The Kernel Doesn't Lie.</span></h2>
          <p class="section-sub">
            Below is a real terminal output from our security test suite. The macOS kernel physically
            terminates any AI agent that attempts a network call. We don’t trust software firewalls— we trust the kernel.
          </p>
          <div class="live-terminal">
            <div class="lt-bar">
              <div class="lt-dots"><span></span><span></span><span></span></div>
              <span class="lt-title">Hub_Vault/Security/kernel_leak_test.py — kernel&#64;sovereign</span>
              <span class="lt-badge">LIVE OUTPUT</span>
            </div>
            <div class="lt-body">
              <div class="lt-line dim">
                <span class="lt-p">%</span>
                <span>/opt/homebrew/bin/python3 Hub_Vault/Security/kernel_leak_test.py</span>
              </div>
              <div class="lt-line">
                <span class="lt-status attempt">[*]</span>
                <span>Attempting to outrun the proxy with a kernel-level request...</span>
              </div>
              <div class="lt-line highlight">
                <span class="lt-status pass">[PASS]</span>
                <span>Kernel Blocked Request: <strong>SIGABRT (Signal 6) — Abort Trap</strong></span>
              </div>
              <div class="lt-line">
                <span class="lt-status pass">[PASS]</span>
                <span>sandbox-exec: deny network* — process terminated by kernel</span>
              </div>
              <div class="lt-line">
                <span class="lt-status pass">[PASS]</span>
                <span>Zero bytes transmitted. Zero external connections established.</span>
              </div>
              <div class="lt-cursor-line">
                <span class="lt-p">%</span><span class="t-cursor">█</span>
              </div>
            </div>
            <div class="lt-caption">
              🛡️ Physical Proof: Our agents are terminated by the macOS kernel if they attempt to breach the air-gap.
              We don’t trust software firewalls; we trust the kernel.
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════ HARDENED SPECS ═══════ -->
      <section class="section specs-section" id="specs">
        <div class="section-inner">
          <div class="section-label">HARDENED SPECIFICATIONS</div>
          <h2 class="section-title">Built Different.<br><span class="accent-green">At the Hardware Level.</span></h2>
          <div class="specs-grid">
            <div class="spec-card">
              <div class="spec-icon">💻</div>
              <div class="spec-content">
                <div class="spec-label">COMPUTE</div>
                <div class="spec-value">M-Series Apple Silicon</div>
                <div class="spec-detail">Optimized for 14B+ parameter local models. On-device inference only.</div>
              </div>
            </div>
            <div class="spec-card">
              <div class="spec-icon">🔒</div>
              <div class="spec-content">
                <div class="spec-label">ISOLATION</div>
                <div class="spec-value">macOS Seatbelt (sandbox-exec)</div>
                <div class="spec-detail">Kernel-level hardening. deny network* enforced at syscall level.</div>
              </div>
            </div>
            <div class="spec-card">
              <div class="spec-icon">🔌</div>
              <div class="spec-content">
                <div class="spec-label">NETWORK</div>
                <div class="spec-value">10Gb Wired Egress Only</div>
                <div class="spec-detail">Physical Wi-Fi &amp; Bluetooth hardware removed. No wireless attack surface.</div>
              </div>
            </div>
            <div class="spec-card spec-card-full">
              <div class="spec-icon">🔏</div>
              <div class="spec-content">
                <div class="spec-label">INTEGRITY SEAL</div>
                <div class="spec-value">SHA-256 Checksum Verified</div>
                <div class="spec-hash">62391ad564fb190d75acdb6141932f5d26c09f1f67f51749f879d36014911cd0</div>
                <div class="spec-detail">Hub_v2.5_Master.dmg · 17.5 GB · Kernel-hardened production image</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ THE BARRIER ═══════════════════ -->
      <section class="section barrier-section" id="barrier">
        <div class="section-inner">
          <div class="section-label">THE BARRIER</div>
          <h2 class="section-title">Cloud AI is a<br><span class="accent-red">Compliance Liability.</span></h2>
          <p class="section-sub">The Hub draws a hard line. Not a firewall — a Wall.</p>

          <div class="comparison-grid">
            <!-- Cloud AI -->
            <div class="compare-card danger-card">
              <div class="compare-header">
                <span class="compare-icon">☁️</span>
                <h3>Cloud AI</h3>
                <span class="risk-badge">HIGH RISK</span>
              </div>
              <ul class="compare-list">
                <li *ngFor="let r of cloudRisks">
                  <span class="x-icon">✕</span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </div>

            <!-- VS Divider -->
            <div class="vs-divider">
              <div class="vs-line"></div>
              <span class="vs-label">VS</span>
              <div class="vs-line"></div>
            </div>

            <!-- The Hub -->
            <div class="compare-card safe-card">
              <div class="compare-header">
                <span class="compare-icon">⬡</span>
                <h3>The Hub v2.5</h3>
                <span class="safe-badge">SOVEREIGN</span>
              </div>
              <ul class="compare-list">
                <li *ngFor="let s of hubStrengths">
                  <span class="check-icon">✓</span>
                  <span>{{ s }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Abort Trap Callout -->
          <div class="abort-callout">
            <div class="abort-header">
              <span class="abort-badge">[CRITICAL]</span>
              <span class="abort-title">The Kernel Abort Trap — Signal 6</span>
            </div>
            <p class="abort-desc">
              The Hub utilizes the <strong>Abort Trap: 6</strong> error as a formal technical proof of isolation.
              In this architecture, an Abort Trap: 6 is not a failure; it is the <strong>physical evidence of the kernel</strong> successfully
              terminating a process that attempted to violate its isolation boundaries. This serves as the "Black Box"
              flight recorder equivalent for AI, proving the system is physically incapable of exfiltrating data.
            </p>
            <div class="abort-code">
              <pre><code>(version 1)
(deny default)
(deny network*)         ; ← ALL network syscalls blocked at kernel level
(allow file-read* (subpath "/private/tmp/hub"))
(allow process-exec (literal "/usr/bin/python3"))
; Violation → kernel raises SIGABRT (Signal 6) → [CRITICAL] Abort Trap ✓
; Build: Hub_v2.5_Master.dmg (17.5 GB) — kernel-hardened production image</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ OFFLINE AUDITOR ═══════════════════ -->
      <section class="section auditor-section" id="auditor">
        <div class="section-inner">
          <div class="section-label">OFFLINE AUDITOR SKILL</div>
          <h2 class="section-title">Automated Reconciliation.<br><span class="accent-green">Zero External Calls.</span></h2>
          <p class="section-sub">
            The Hub's <strong>ZeroClaw Lifecycle</strong> (Spawn → Execute → Self-Destruct) ensures that sensitive 
            reconciliation tasks are handled in a physically isolated ephemeral vault. No persistent logic remains.
          </p>

          <div class="flow-diagram">
            <div class="flow-step" *ngFor="let step of auditFlow; let i = index">
              <div class="flow-node">
                <span class="flow-icon">{{ step.icon }}</span>
                <span class="flow-label">{{ step.label }}</span>
                <span class="flow-sub">{{ step.sub }}</span>
              </div>
              <div class="flow-arrow" *ngIf="i < auditFlow.length - 1">→</div>
            </div>
          </div>

          <div class="auditor-features">
            <div class="aud-feature" *ngFor="let f of auditorFeatures">
              <div class="aud-icon">{{ f.icon }}</div>
              <div class="aud-text">
                <h4>{{ f.title }}</h4>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ AUDIT VERDICT CERTIFICATE ═══════════════════ -->
      <section class="section cert-section" id="certificate">
        <div class="section-inner cert-inner">
          <div>
            <div class="section-label">AUDIT VERDICT CERTIFICATE</div>
            <h2 class="section-title">Primary Audit Document.<br><span class="accent-green">Cryptographically Sealed.</span></h2>
            <p class="section-sub">
              Every audit produces a legally formatted PDF report accepted by <strong>SARS, FSCA, IRBA,
              and the Law Society of South Africa</strong>. The system generates an automated 
              <strong>Weekly Sovereignty Report</strong> detailing blocked leak attempts and verified tasks, 
              satisfying the most stringent regulatory requirements through SHA-256 Integrity Seals.
            </p>
            <ul class="cert-points">
              <li *ngFor="let p of certPoints">
                <span class="cert-check">✓</span> {{ p }}
              </li>
            </ul>
          </div>

          <!-- Certificate Card -->
          <div class="cert-card">
            <div class="cert-header">
              <span class="cert-logo">⬡</span>
              <div>
                <div class="cert-title">AUDIT VERDICT CERTIFICATE</div>
                <div class="cert-subtitle">Taajirah Systems · Hub v2.5</div>
              </div>
              <span class="cert-status">PASSED</span>
            </div>
            <div class="cert-body">
              <div class="cert-row" *ngFor="let row of certRows">
                <span class="cert-key">{{ row.key }}</span>
                <span class="cert-val" [class.mono]="row.mono">{{ row.val }}</span>
              </div>
            </div>
            <div class="cert-seal">
              <div class="seal-line">
                <span class="seal-label">SHA-256 INTEGRITY SEAL</span>
                <span class="seal-hash">62391ad564fb190d75acdb6141932f5d26c09f1f67f51749f879d36014911cd0</span>
              </div>
              <div class="seal-line">
                <span class="seal-label">SOVEREIGNTY SIGNATURE</span>
                <span class="seal-hash">kernel&#64;sandbox · SIGABRT-wall · VERIFIED ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ POPIA ═══════════════════ -->
      <section class="section popia-section" id="popia">
        <div class="section-inner popia-inner">
          <div class="popia-shield">
            <div class="shield-icon">🛡</div>
            <div class="shield-text">POPIA<br>COMPLIANT</div>
          </div>
          <div class="popia-content">
            <div class="section-label">POPIA COMPLIANCE</div>
            <h2 class="section-title">100% Local Data Residency.<br><span class="accent-green">Guaranteed.</span></h2>
            <p class="section-sub">
              Under POPIA, client data processed by a third-party cloud AI constitutes a data transfer
              requiring explicit consent and a data processing agreement. The Hub eliminates this risk
              entirely — data never leaves your physical premises.
            </p>
            <div class="popia-stats">
              <div class="stat" *ngFor="let s of popiaStats">
                <div class="stat-value">{{ s.value }}</div>
                <div class="stat-label">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ CTA ═══════════════════ -->
      <section class="section cta-section" id="cta">
        <div class="cta-grid-bg"></div>
        <div class="section-inner cta-inner">
          <div class="section-label">GET STARTED</div>
          <h2 class="section-title">Ready for Sovereign AI?</h2>
          <p class="section-sub">
            Request our full Technical White Paper — or book a live, offline, in-person demo
            at your premises. No data leaves your building. Ever.
          </p>
          <div class="cta-cards">
            <div class="cta-card primary-cta">
              <div class="cta-card-icon">📄</div>
              <h3>Technical Framework</h3>
              <p>Download the high-level architecture overview, security controls, and Abort Trap implementation details.</p>
              
              <!-- Hidden Download Link -->
              <a #downloadLink href="/Taajirah_Systems_Hub_v2.5_White_Paper.pdf" download="Taajirah_Systems_Hub_v2.5_White_Paper.pdf" style="display: none;"></a>

              <div class="whitepaper-form" *ngIf="!whitepaperSuccess">
                <input type="text" [(ngModel)]="whitepaperFirm" placeholder="Firm Name (Required)" class="wp-input">
                <input type="email" [(ngModel)]="whitepaperEmail" placeholder="Email Address (Required)" class="wp-input">
                <button class="btn-primary full-width" (click)="downloadWhitepaper()" [disabled]="!whitepaperEmail || !whitepaperFirm">
                  DOWNLOAD SYSTEM FRAMEWORK
                </button>
              </div>

              <div class="wp-success" *ngIf="whitepaperSuccess">
                <strong>✓ White Paper Downloaded.</strong><br>
                <span class="pulse-text">Verifying Integrity...</span>
              </div>
            </div>
            <div class="cta-card secondary-cta" id="demo">
              <div class="cta-card-icon">🔒</div>
              <h3>Book a Sovereignty Demo</h3>
              <p>Offline · In-Person · Zero-Risk. We bring The Hub to your firm and run a live audit with your own documents.</p>
              <a href="mailto:taajirah0@gmail.com?subject=Demo%20Request%20%E2%80%94%20The%20Hub%20v2.5&body=I%20would%20like%20to%20book%20a%2015-minute%20in-person%20Sovereignty%20Demo."
                 class="btn-outline full-width">Book a 15-Minute Sovereignty Demo →</a>
              <div class="demo-note">
                <span>📍</span> Offline · In-Person · Zero-Risk
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ FOOTER ═══════════════════ -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="assets/branding/taajirah-logo.png" alt="Taajirah Systems" class="brand-logo footer-logo">
            <div>
              <div class="footer-name">TAAJIRAH SYSTEMS</div>
              <div class="footer-tagline">Sovereign Infrastructure Architects.</div>
            </div>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <h4>The Hub v2.5</h4>
              <button (click)="scroll('barrier')">Security Architecture</button>
              <button (click)="scroll('auditor')">Offline Auditor</button>
              <button (click)="scroll('certificate')">Verdict Certificates</button>
              <button (click)="scroll('popia')">POPIA Compliance</button>
            </div>
            <div class="footer-col">
              <h4>Contact</h4>
              <a href="mailto:taajirah0@gmail.com">taajirah0&#64;gmail.com</a>
              <button (click)="scroll('cta', $event)">Request White Paper</button>
              <button (click)="scroll('demo', $event)">Book a Demo</button>
            </div>
            <div class="footer-col">
              <h4>Legal & Archive</h4>
              <button (click)="router.navigate(['privacy'])">Privacy Policy</button>
              <button (click)="router.navigate(['terms'])">Terms of Service</button>
              <button (click)="router.navigate(['archive'])">Legacy Portfolio</button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© {{ currentYear }} Taajirah Systems. All rights reserved.</span>
          <span class="footer-compliance">POPIA Compliant · No Cloud · Kernel Verified</span>
        </div>
      </footer>

    </div><!-- /hub-root -->
  `,
  styles: [`
    /* ── ROOT ──────────────────────────────────── */
    :host { display: block; overflow-y: auto; height: 100%; }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    button { font-family: inherit; font-size: inherit; line-height: inherit; cursor: pointer; border: none; background: none; padding: 0; appearance: none; -webkit-appearance: none; }


    .hub-root {
      background: #020b12;
      color: #e8f4f8;
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* ── NAVBAR ────────────────────────────────── */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: rgba(2, 11, 18, 0.7);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,255,136,0.15);
      transition: background 0.3s;
    }
    .navbar.scrolled {
      background: rgba(2, 11, 18, 0.97);
      border-bottom-color: rgba(0,255,136,0.3);
      box-shadow: 0 4px 30px rgba(0,0,0,0.5);
    }
    .nav-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 1.5rem; height: 68px;
    }
    .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
    .brand-logo {
      width: 40px; height: 40px;
      object-fit: contain; border-radius: 50%;
      flex-shrink: 0;
    }
    .brand-logo.footer-logo {
      width: 56px; height: 56px;
    }
    .brand-name {
      display: block; font-size: 0.85rem; font-weight: 700;
      letter-spacing: 3px; color: #e8f4f8;
      font-family: 'JetBrains Mono', monospace;
    }
    .brand-sub { display: block; font-size: 0.65rem; color: #4a7a8a; letter-spacing: 1px; }
    .nav-links { display: flex; align-items: center; gap: 0.25rem; }
    .nav-link {
      color: #8ab4c9; text-decoration: none; font-size: 0.85rem;
      padding: 0.4rem 0.75rem; border-radius: 6px;
      transition: all 0.2s; cursor: pointer;
    }
    .nav-link:hover { color: #00ff88; background: rgba(0,255,136,0.06); }
    .nav-cta {
      background: rgba(0,255,136,0.12);
      border: 1px solid rgba(0,255,136,0.4);
      color: #00ff88; font-size: 0.8rem; font-weight: 600;
      padding: 0.45rem 1rem; border-radius: 6px;
      cursor: pointer; transition: all 0.2s; margin-left: 0.5rem;
      font-family: 'JetBrains Mono', monospace; white-space: nowrap;
    }
    .nav-cta:hover {
      background: rgba(0,255,136,0.2);
      box-shadow: 0 0 16px rgba(0,255,136,0.2);
    }
    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    .hamburger span {
      width: 22px; height: 2px; background: #e8f4f8;
      border-radius: 2px; transition: all 0.3s;
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
    .mobile-menu {
      display: none; flex-direction: column;
      background: rgba(2,11,18,0.98);
      border-top: 1px solid rgba(0,255,136,0.15);
      padding: 1rem 1.5rem;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu button {
      color: #8ab4c9; text-align: left; padding: 0.85rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-size: 0.95rem; cursor: pointer; transition: color 0.2s;
      width: 100%; display: block;
    }
    .mobile-menu button:hover { color: #00ff88; }
    .mobile-menu .mobile-cta {
      color: #00ff88; font-weight: 700; border-bottom: none;
      margin-top: 0.5rem; font-family: 'JetBrains Mono', monospace;
      letter-spacing: 1px;
    }
    @media (min-width: 769px) { .hamburger { display: none; } }
    @media (max-width: 768px) {
      .desktop-nav { display: none; }
      .hamburger { display: flex; }
    }

    /* ── HERO ──────────────────────────────────── */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 120px 1.5rem 4rem; overflow: hidden;
    }
    .hero-grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%);
    }
    .hero-glow {
      position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
      width: 800px; height: 600px; border-radius: 50%;
      background: radial-gradient(ellipse, rgba(0,255,136,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-content {
      position: relative; z-index: 1;
      max-width: 820px; width: 100%; text-align: center;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: rgba(0,255,136,0.08);
      border: 1px solid rgba(0,255,136,0.25);
      border-radius: 100px; padding: 0.35rem 1rem;
      font-size: 0.78rem; color: #00ff88;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px; margin-bottom: 1rem;
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #00ff88;
      box-shadow: 0 0 6px #00ff88;
      animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%,100% { box-shadow: 0 0 6px #00ff88; }
      50% { box-shadow: 0 0 14px #00ff88, 0 0 28px rgba(0,255,136,0.4); }
    }
    .prod-badge-strip {
      display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
    .prod-badge {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: rgba(0,255,136,0.15);
      border: 1px solid #00ff88;
      border-radius: 6px; padding: 0.3rem 0.8rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem; font-weight: 700; color: #00ff88;
      letter-spacing: 1px;
    }
    .prod-version {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem; color: #4a7a8a;
    }
    .sha-seal {
      display: flex; flex-direction: column; gap: 0.25rem;
      background: rgba(0,191,255,0.06);
      border: 1px solid rgba(0,191,255,0.2);
      border-radius: 8px; padding: 0.75rem 1rem;
      margin-bottom: 1.5rem; text-align: left;
    }
    .sha-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; color: #00bfff; letter-spacing: 1.5px;
    }
    .sha-hash {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; color: #6a98b0;
      word-break: break-all; line-height: 1.5;
    }

    /* ── ARCH SVG DIAGRAM ─────────────────────── */
    .arch-diagram-wrap {
      width: 100%; max-width: 680px;
      margin: 0 auto 2rem;
      background: rgba(0,255,136,0.02);
      border: 1px solid rgba(0,255,136,0.15);
      border-radius: 12px; overflow: hidden;
    }
    .arch-svg { width: 100%; height: auto; display: block; }

    /* ── LIVE TERMINAL ────────────────────────── */
    .verify-section { background: #030e18; }
    .live-terminal {
      background: #010a10;
      border: 1px solid rgba(0,255,136,0.3);
      border-radius: 12px; overflow: hidden;
      max-width: 820px; margin: 0 auto;
      box-shadow: 0 0 40px rgba(0,255,136,0.06);
    }
    .lt-bar {
      display: flex; align-items: center; gap: 0.75rem;
      background: #071520; padding: 0.6rem 1rem;
      border-bottom: 1px solid rgba(0,255,136,0.15);
    }
    .lt-dots { display: flex; gap: 6px; }
    .lt-dots span {
      width: 10px; height: 10px; border-radius: 50%;
      background: #1e3a2a;
    }
    .lt-dots span:first-child { background: #3a1a1a; }
    .lt-dots span:nth-child(2) { background: #2a2a1a; }
    .lt-dots span:nth-child(3) { background: #00ff88; box-shadow: 0 0 5px #00ff88; }
    .lt-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem; color: #4a7a8a; flex: 1;
    }
    .lt-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; font-weight: 700;
      color: #00ff88; background: rgba(0,255,136,0.1);
      border: 1px solid rgba(0,255,136,0.3);
      border-radius: 4px; padding: 0.15rem 0.5rem;
      letter-spacing: 1px;
    }
    .lt-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .lt-line {
      display: flex; gap: 0.75rem; align-items: baseline;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem; color: #c8e8d8; line-height: 1.6;
    }
    .lt-line.dim { color: #3a5a6a; }
    .lt-line.highlight {
      background: rgba(0,255,136,0.06);
      border-left: 3px solid #00ff88;
      padding: 0.35rem 0.75rem; border-radius: 0 6px 6px 0;
      color: #e8f4f8;
    }
    .lt-line.highlight strong { color: #00ff88; }
    .lt-p { color: #4a7a8a; flex-shrink: 0; }
    .lt-status { font-weight: 700; flex-shrink: 0; min-width: 52px; }
    .lt-status.pass { color: #00ff88; }
    .lt-status.attempt { color: #ffc107; }
    .lt-cursor-line {
      display: flex; gap: 0.5rem; align-items: center;
      font-family: 'JetBrains Mono', monospace; color: #4a7a8a;
      font-size: 0.82rem; margin-top: 0.25rem;
    }
    .lt-caption {
      padding: 0.85rem 1.5rem;
      border-top: 1px solid rgba(0,255,136,0.12);
      font-size: 0.8rem; color: #6a98b0;
      font-style: italic; line-height: 1.6;
    }

    /* ── HARDENED SPECS ───────────────────────── */
    .specs-section { background: #020b12; }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem; margin-top: 2.5rem;
    }
    @media (max-width: 768px) { .specs-grid { grid-template-columns: 1fr; } }
    .spec-card {
      display: flex; gap: 1rem; align-items: flex-start;
      background: rgba(0,191,255,0.03);
      border: 1px solid rgba(0,191,255,0.15);
      border-radius: 10px; padding: 1.25rem;
      transition: border-color 0.2s;
    }
    .spec-card:hover { border-color: rgba(0,255,136,0.3); }
    .spec-card-full { grid-column: 1 / -1; }
    .spec-icon { font-size: 1.6rem; flex-shrink: 0; }
    .spec-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; color: #00bfff;
      letter-spacing: 2px; margin-bottom: 0.25rem;
    }
    .spec-value {
      font-size: 0.95rem; font-weight: 700;
      color: #e8f4f8; margin-bottom: 0.4rem;
    }
    .spec-detail { font-size: 0.8rem; color: #5a8a9a; line-height: 1.5; }
    .spec-hash {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem; color: #00ff88;
      word-break: break-all; margin-bottom: 0.4rem;
      line-height: 1.5;
    }

    .hero-headline {
      font-size: clamp(2.2rem, 6vw, 4.2rem);
      font-weight: 800; line-height: 1.1;
      color: #e8f4f8; margin-bottom: 1.5rem;
      letter-spacing: -1px;
    }
    .accent-green { color: #00ff88; text-shadow: 0 0 30px rgba(0,255,136,0.4); }
    .accent-red { color: #ff4a4a; }
    .hero-sub {
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      color: #8ab4c9; margin-bottom: 2rem;
      max-width: 640px; margin-left: auto; margin-right: auto;
    }
    .hero-sub strong { color: #e8f4f8; }

    /* Terminal window */
    .terminal-window {
      background: #050f19; border: 1px solid rgba(0,255,136,0.25);
      border-radius: 10px; overflow: hidden;
      margin: 0 auto 2.5rem; max-width: 580px; text-align: left;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.06);
    }
    .terminal-bar {
      display: flex; align-items: center; gap: 0.4rem;
      padding: 0.6rem 1rem;
      background: rgba(255,255,255,0.04);
      border-bottom: 1px solid rgba(0,255,136,0.1);
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.red { background: #ff5f57; }
    .dot.yellow { background: #febc2e; }
    .dot.green { background: #28c840; }
    .terminal-title { margin-left: 0.5rem; font-size: 0.75rem; color: #4a7a8a; font-family: 'JetBrains Mono', monospace; }
    .terminal-body { padding: 1rem 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
    .t-line { display: flex; gap: 0.5rem; margin-bottom: 0.3rem; color: #00ff88; }
    .t-line.dim { color: #2a5a3a; }
    .t-prompt { color: #4a7a8a; }
    .t-cursor {
      display: inline-block; color: #00ff88;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

    /* CTA buttons */
    .hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      background: linear-gradient(135deg, #00ff88, #00c96a);
      color: #020b12; font-weight: 700; font-size: 0.9rem;
      padding: 0.85rem 1.75rem; border-radius: 8px;
      cursor: pointer; text-decoration: none;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.3px;
      transition: all 0.25s; border: none; display: inline-block;
      box-shadow: 0 4px 20px rgba(0,255,136,0.3);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,255,136,0.45); }
    .btn-secondary {
      background: transparent;
      border: 1px solid rgba(0,191,255,0.4);
      color: #00bfff; font-weight: 600; font-size: 0.9rem;
      padding: 0.85rem 1.75rem; border-radius: 8px;
      cursor: pointer; text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.25s; display: inline-block;
    }
    .btn-secondary:hover {
      background: rgba(0,191,255,0.08);
      border-color: #00bfff;
      box-shadow: 0 0 20px rgba(0,191,255,0.15);
    }
    .btn-outline {
      background: transparent;
      border: 1px solid rgba(0,191,255,0.4);
      color: #00bfff; font-weight: 600; font-size: 0.9rem;
      padding: 0.85rem 1.75rem; border-radius: 8px;
      cursor: pointer; text-decoration: none;
      transition: all 0.25s; display: inline-block; text-align: center;
    }
    .btn-outline:hover { background: rgba(0,191,255,0.08); border-color: #00bfff; }
    .full-width { width: 100%; }

    /* ── TRUST BAR ─────────────────────────────── */
    .trust-bar {
      background: rgba(0,255,136,0.04);
      border-top: 1px solid rgba(0,255,136,0.1);
      border-bottom: 1px solid rgba(0,255,136,0.1);
    }
    .trust-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: center;
      flex-wrap: wrap; gap: 0; padding: 0;
    }
    .trust-badge {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.9rem 2rem;
      font-size: 0.78rem; font-family: 'JetBrains Mono', monospace;
      color: #00ff88; font-weight: 600; letter-spacing: 0.5px;
      border-right: 1px solid rgba(0,255,136,0.12);
    }
    .trust-badge:last-child { border-right: none; }
    .trust-icon { font-size: 1rem; }

    /* ── SECTIONS ──────────────────────────────── */
    .section { padding: 6rem 1.5rem; }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-label {
      font-size: 0.72rem; font-family: 'JetBrains Mono', monospace;
      color: #00ff88; letter-spacing: 3px; font-weight: 600;
      margin-bottom: 1rem; opacity: 0.8;
    }
    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 800; line-height: 1.15;
      color: #e8f4f8; margin-bottom: 1rem; letter-spacing: -0.5px;
    }
    .section-sub {
      font-size: 1.05rem; color: #6a98b0; max-width: 620px;
      line-height: 1.7; margin-bottom: 3rem;
    }

    /* ── BARRIER ───────────────────────────────── */
    .barrier-section {
      background: radial-gradient(ellipse 1000px 500px at 50% 50%, rgba(255,74,74,0.04), transparent);
    }
    .comparison-grid {
      display: grid; grid-template-columns: 1fr auto 1fr;
      gap: 1.5rem; align-items: start; margin-bottom: 3rem;
    }
    @media (max-width: 768px) {
      .comparison-grid { grid-template-columns: 1fr; }
      .vs-divider { flex-direction: row; padding: 0; }
      .vs-line { flex: 1; height: 1px; width: auto; }
    }
    .compare-card {
      background: rgba(10,25,41,0.8); border-radius: 14px;
      padding: 1.75rem; backdrop-filter: blur(10px);
    }
    .danger-card { border: 1px solid rgba(255,74,74,0.3); }
    .safe-card { border: 1px solid rgba(0,255,136,0.3); }
    .compare-header {
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1.5rem; flex-wrap: wrap;
    }
    .compare-icon { font-size: 1.5rem; }
    .compare-header h3 { font-size: 1.2rem; flex: 1; }
    .risk-badge {
      font-size: 0.65rem; font-family: 'JetBrains Mono', monospace;
      background: rgba(255,74,74,0.15); color: #ff4a4a;
      border: 1px solid rgba(255,74,74,0.3); border-radius: 4px;
      padding: 0.2rem 0.5rem; letter-spacing: 1px;
    }
    .safe-badge {
      font-size: 0.65rem; font-family: 'JetBrains Mono', monospace;
      background: rgba(0,255,136,0.1); color: #00ff88;
      border: 1px solid rgba(0,255,136,0.3); border-radius: 4px;
      padding: 0.2rem 0.5rem; letter-spacing: 1px;
    }
    .compare-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
    .compare-list li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.9rem; color: #8ab4c9; }
    .x-icon { color: #ff4a4a; font-weight: 700; flex-shrink: 0; }
    .check-icon { color: #00ff88; font-weight: 700; flex-shrink: 0; }
    .vs-divider {
      display: flex; flex-direction: column;
      align-items: center; gap: 0.5rem; padding: 2rem 0;
    }
    .vs-line { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
    .vs-label {
      font-size: 0.8rem; font-family: 'JetBrains Mono', monospace;
      color: #4a7a8a; letter-spacing: 2px;
    }

    /* Abort Trap */
    .abort-callout {
      background: rgba(5,15,25,0.9);
      border: 1px solid rgba(255,74,74,0.35);
      border-left: 3px solid #ff4a4a;
      border-radius: 12px; padding: 1.75rem;
      box-shadow: 0 0 40px rgba(255,74,74,0.05);
    }
    .abort-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .abort-badge {
      font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
      background: rgba(255,74,74,0.15); color: #ff4a4a;
      border: 1px solid rgba(255,74,74,0.4); border-radius: 4px;
      padding: 0.2rem 0.6rem; font-weight: 700; letter-spacing: 1px;
    }
    .abort-title { font-size: 1.1rem; font-weight: 700; color: #e8f4f8; }
    .abort-desc { color: #8ab4c9; font-size: 0.9rem; line-height: 1.75; margin-bottom: 1.25rem; }
    .abort-desc strong { color: #e8f4f8; }
    .abort-desc code {
      font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
      background: rgba(255,74,74,0.1); color: #ff4a4a;
      padding: 0.1rem 0.35rem; border-radius: 4px;
    }
    .abort-code pre {
      background: #020b0f; border: 1px solid rgba(0,255,136,0.12);
      border-radius: 8px; padding: 1.25rem; overflow-x: auto;
    }
    .abort-code code {
      font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
      color: #00ff88; background: none; padding: 0;
      display: block; white-space: pre; line-height: 1.8;
    }

    /* ── AUDITOR ───────────────────────────────── */
    .auditor-section {
      background: radial-gradient(ellipse 800px 400px at 50% 50%, rgba(0,191,255,0.04), transparent);
    }
    .flow-diagram {
      display: flex; align-items: center;
      flex-wrap: wrap; gap: 0.5rem;
      background: rgba(10,25,41,0.7); border: 1px solid rgba(0,191,255,0.2);
      border-radius: 14px; padding: 2rem; margin-bottom: 3rem;
      justify-content: center;
    }
    .flow-step { display: flex; align-items: center; gap: 0.5rem; }
    .flow-node {
      display: flex; flex-direction: column; align-items: center;
      gap: 0.25rem; text-align: center;
      background: rgba(0,191,255,0.06); border: 1px solid rgba(0,191,255,0.2);
      border-radius: 10px; padding: 1rem 1.25rem; min-width: 110px;
    }
    .flow-icon { font-size: 1.5rem; }
    .flow-label { font-size: 0.78rem; font-weight: 600; color: #e8f4f8; font-family: 'JetBrains Mono', monospace; }
    .flow-sub { font-size: 0.65rem; color: #4a7a8a; }
    .flow-arrow { font-size: 1.2rem; color: #00bfff; flex-shrink: 0; padding: 0 0.25rem; }
    .auditor-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
    .aud-feature {
      display: flex; gap: 1rem; align-items: flex-start;
      background: rgba(10,25,41,0.7); border: 1px solid rgba(0,191,255,0.15);
      border-radius: 12px; padding: 1.25rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .aud-feature:hover { border-color: rgba(0,191,255,0.35); transform: translateY(-3px); }
    .aud-icon { font-size: 1.5rem; flex-shrink: 0; }
    .aud-text h4 { font-size: 0.9rem; color: #e8f4f8; margin-bottom: 0.35rem; }
    .aud-text p { font-size: 0.82rem; color: #6a98b0; line-height: 1.6; }

    /* ── CERTIFICATE ───────────────────────────── */
    .cert-section {
      background: radial-gradient(ellipse 800px 400px at 50% 50%, rgba(0,255,136,0.04), transparent);
    }
    .cert-inner {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 4rem; align-items: center;
    }
    @media (max-width: 900px) { .cert-inner { grid-template-columns: 1fr; } }
    .cert-points { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
    .cert-points li { display: flex; gap: 0.75rem; font-size: 0.9rem; color: #8ab4c9; }
    .cert-check { color: #00ff88; font-weight: 700; flex-shrink: 0; }

    .cert-card {
      background: rgba(5,15,25,0.95); border: 1px solid rgba(0,255,136,0.3);
      border-radius: 14px; overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(0,255,136,0.05);
    }
    .cert-header {
      display: flex; align-items: center; gap: 1rem;
      padding: 1.25rem 1.5rem;
      background: rgba(0,255,136,0.06);
      border-bottom: 1px solid rgba(0,255,136,0.15);
    }
    .cert-logo { font-size: 2rem; color: #00ff88; }
    .cert-title { font-size: 0.78rem; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #00ff88; letter-spacing: 1px; }
    .cert-subtitle { font-size: 0.7rem; color: #4a7a8a; font-family: 'JetBrains Mono', monospace; }
    .cert-status {
      margin-left: auto; font-size: 0.7rem; font-family: 'JetBrains Mono', monospace;
      background: rgba(0,255,136,0.15); color: #00ff88;
      border: 1px solid rgba(0,255,136,0.4); border-radius: 4px;
      padding: 0.25rem 0.6rem; font-weight: 700; letter-spacing: 1px;
    }
    .cert-body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .cert-row { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.8rem; }
    .cert-key { color: #4a7a8a; font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }
    .cert-val { color: #e8f4f8; text-align: right; word-break: break-all; }
    .cert-val.mono { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #00ff88; }
    .cert-seal {
      padding: 1rem 1.5rem;
      background: rgba(0,255,136,0.04);
      border-top: 1px solid rgba(0,255,136,0.15);
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .seal-line { display: flex; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
    .seal-label { font-size: 0.65rem; font-family: 'JetBrains Mono', monospace; color: #4a7a8a; letter-spacing: 1px; }
    .seal-hash { font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: #00ff88; word-break: break-all; }

    /* ── POPIA ─────────────────────────────────── */
    .popia-section { background: rgba(0,5,10,0.95); }
    .popia-inner {
      display: grid; grid-template-columns: auto 1fr;
      gap: 4rem; align-items: center;
    }
    @media (max-width: 768px) { .popia-inner { grid-template-columns: 1fr; } }
    .popia-shield {
      display: flex; flex-direction: column; align-items: center;
      gap: 0.75rem; flex-shrink: 0;
    }
    .shield-icon { font-size: 5rem; filter: drop-shadow(0 0 20px rgba(0,255,136,0.4)); }
    .shield-text {
      font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
      font-weight: 700; color: #00ff88; text-align: center; letter-spacing: 2px;
    }
    .popia-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-top: 1rem; }
    .stat {
      background: rgba(10,25,41,0.8); border: 1px solid rgba(0,255,136,0.2);
      border-radius: 10px; padding: 1.25rem; text-align: center;
    }
    .stat-value { font-size: 1.8rem; font-weight: 800; color: #00ff88; margin-bottom: 0.25rem; }
    .stat-label { font-size: 0.72rem; color: #6a98b0; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.5px; }

    /* ── CTA SECTION ───────────────────────────── */
    .cta-section {
      position: relative; overflow: hidden;
      background: rgba(0,5,10,0.9);
    }
    .cta-grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(0,255,136,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.035) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .cta-inner { position: relative; z-index: 1; text-align: center; }
    .cta-inner .section-sub { margin-left: auto; margin-right: auto; }
    .cta-cards {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem; text-align: left; margin-top: 1rem;
    }
    .cta-card {
      background: rgba(10,25,41,0.9); border-radius: 14px;
      padding: 2rem; backdrop-filter: blur(10px);
      display: flex; flex-direction: column; gap: 1rem;
    }
    .primary-cta { border: 1px solid rgba(0,255,136,0.3); }
    .secondary-cta { border: 1px solid rgba(0,191,255,0.25); }
    .cta-card-icon { font-size: 2.5rem; }
    .cta-card h3 { font-size: 1.2rem; color: #e8f4f8; }
    .cta-card p { font-size: 0.88rem; color: #6a98b0; line-height: 1.7; flex: 1; }
    .demo-note {
      display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.78rem; color: #4a7a8a;
      font-family: 'JetBrains Mono', monospace; margin-top: 0.25rem;
    }

    /* ── FOOTER ────────────────────────────────── */
    .site-footer {
      background: #010810;
      border-top: 1px solid rgba(0,255,136,0.12);
      padding: 4rem 1.5rem 0;
    }
    .footer-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: auto 1fr;
      gap: 4rem; padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 2rem; } }
    .footer-brand { display: flex; align-items: flex-start; gap: 0.75rem; }
    .footer-name {
      font-size: 0.85rem; font-family: 'JetBrains Mono', monospace;
      letter-spacing: 3px; color: #e8f4f8; font-weight: 700;
    }
    .footer-tagline { font-size: 0.75rem; color: #00ff88; margin-top: 0.25rem; }
    .footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
    @media (max-width: 600px) { .footer-cols { grid-template-columns: 1fr 1fr; } }
    .footer-col h4 { font-size: 0.78rem; color: #00ff88; font-family: 'JetBrains Mono', monospace; letter-spacing: 1px; margin-bottom: 1rem; }
    .footer-col a,
    .footer-col button {
      display: block; color: #4a7a8a; font-size: 0.82rem;
      text-decoration: none; padding: 0.3rem 0;
      cursor: pointer; transition: color 0.2s;
      background: none; border: none; text-align: left; font-family: inherit;
    }
    .footer-col a:hover, .footer-col button:hover { color: #e8f4f8; }
    .footer-bottom {
      max-width: 1100px; margin: 0 auto;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 1rem;
      padding: 1.25rem 0; font-size: 0.75rem; color: #2a5a6a;
      font-family: 'JetBrains Mono', monospace;
    }
    .footer-compliance { color: #1a4a3a; }
    /* Whitepaper Form */
    .whitepaper-form { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem; }
    .wp-input {
      background: rgba(0,0,0,0.3); border: 1px solid rgba(0,255,136,0.2);
      border-radius: 6px; padding: 0.75rem; color: #fff; font-size: 0.85rem;
      font-family: inherit; width: 100%;
    }
    .wp-input:focus { border-color: #00ff88; outline: none; background: rgba(0,255,136,0.05); }
    .wp-btn {
      background: #00ff88; color: #020b12; border: none; border-radius: 6px;
      padding: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
      font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
    }
    .wp-btn:hover { background: #00da74; transform: translateY(-1px); }
    .wp-btn:disabled { background: #1a4a3a; color: #00ff88; cursor: not-allowed; opacity: 0.7; }
    .wp-success {
      background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.3);
      padding: 1rem; border-radius: 8px; color: #00ff88; font-size: 0.85rem;
      text-align: center; margin-top: 1rem;
    }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;
  
  currentYear = new Date().getFullYear();
  isScrolled = false;
  menuOpen = false;

  // Whitepaper State
  whitepaperEmail = '';
  whitepaperFirm = '';
  whitepaperSuccess = false;
  whitepaperSubmitting = false;

  terminalLines = [
    'hub_v2.5 --init --profile=seatbelt_sovereign',
    'kernel → sandbox-exec: deny network* ✓',
    'loading NemoClaw reasoning engine...',
    'agent_uuid=f3a9c2d1 | isolation=VERIFIED',
    'audit_session → ACTIVE | cloud_egress=ZERO'
  ];

  trustBadges = [
    { icon: '⬡', label: 'NVIDIA NemoClaw' },
    { icon: '🔐', label: 'macOS Seatbelt' },
    { icon: '#', label: 'SHA-256 Sealed' },
    { icon: '🛡', label: 'POPIA Compliant' },
    { icon: '⚡', label: 'Zero Cloud Egress' },
    { icon: '🏢', label: 'Physical Appliance' },
  ];

  cloudRisks = [
    'Data exported to third-party servers',
    'Network dependency — single point of failure',
    'No audit trail over training data usage',
    'POPIA compliance requires DPA for every query',
    'Vendor lock-in and ongoing API costs',
    'Breach liability on your firm, not the vendor',
  ];

  hubStrengths = [
    'All reasoning happens inside a kernel sandbox',
    'Air-gapped by default — no network syscalls',
    'SHA-256 sealed, kernel-verified audit trail',
    '100% local data residency — POPIA guaranteed',
    'One-time hardware investment, zero cloud fees',
    '[CRITICAL] Abort Trap: 6 — Physical isolation proof',
    'ZeroClaw lifecycle: Spawn → Execute → Purge',
  ];

  auditFlow = [
    { icon: '📄', label: 'Invoices', sub: 'Client documents' },
    { icon: '🏦', label: 'Bank Ledger', sub: 'Statement data' },
    { icon: '⬡', label: 'NemoClaw', sub: 'On-device AI' },
    { icon: '⚖️', label: 'Reconcile', sub: 'Zero API calls' },
    { icon: '📋', label: 'Verdict', sub: 'PASS / FLAG' },
  ];

  auditorFeatures = [
    { icon: '🔌', title: 'No External API Calls', desc: 'The entire reconciliation pipeline runs on-device using NemoClaw. No OpenAI, no Azure, no cloud of any kind.' },
    { icon: '⚡', title: 'Real-Time Flagging', desc: 'Discrepancies between invoices and bank ledger entries are flagged instantly with line-item evidence.' },
    { icon: '📑', title: 'Multi-Format Ingestion', desc: 'Accepts PDFs, CSV bank exports, and scanned documents — all processed locally without external OCR services.' },
    { icon: '🔒', title: 'Immutable Audit Log', desc: 'Every reconciliation action is logged with a timestamp and agent UUID, sealed in the Weekly Sovereignty Report.' },
    { icon: '🛡', title: 'ZeroClaw Lifecycle', desc: 'Agents are spawned in an isolated vault, execute the logic, and self-destruct, ensuring no PII persists on the device.' },
  ];

  certPoints = [
    'Hub Serial ID and unique Agent UUID per audit',
    'Full logic trace of every reconciliation decision',
    'SHA-256 hash of the document corpus audited',
    'Kernel-verified Sovereignty Signature',
    'Weekly Sovereignty Report (Blocked Leak Attempts)',
    'Formatted for submission to FSCA, IRBA, and Law Society',
  ];

  certRows = [
    { key: 'HUB_ID', val: 'HUB-ZA-2025-0042', mono: false },
    { key: 'AGENT_UUID', val: 'f3a9c2d1-8b7e-4f2a', mono: true },
    { key: 'VERDICT', val: 'PASSED — 0 discrepancies', mono: false },
    { key: 'DOCUMENTS', val: '247 invoices · 3 statements', mono: false },
    { key: 'KERNEL_ENV', val: 'sandbox-exec · deny network*', mono: true },
    { key: 'TIMESTAMP', val: new Date().toISOString().split('T')[0], mono: true },
  ];

  popiaStats = [
    { value: '0%', label: 'Cloud Egress' },
    { value: '100%', label: 'Local Residency' },
    { value: '0', label: 'Third-Party DPAs' },
    { value: '∞', label: 'Audit Integrity' },
  ];

  private scrollHandler = () => {
    this.isScrolled = this.el.nativeElement.scrollTop > 20;
  };

  ngOnInit() {
    this.el.nativeElement.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('scroll', this.scrollHandler);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scroll(id: string, event?: Event) {
    if (event) event.preventDefault();
    this.menuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      const hostEl = this.el.nativeElement;
      const rect = el.getBoundingClientRect();
      const scrollTarget = rect.top + hostEl.scrollTop - 68;
      hostEl.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  }

  // This function was removed as per the user's instruction to update downloadWhitepaper
  // async submitWhitepaperRequest() {
  //   if (!this.whitepaperEmail || !this.whitepaperFirm) return;
  //   this.whitepaperSubmitting = true;
  //   try {
  //     await addDoc(collection(this.firestore, 'whitepaperRequests'), {
  //       email: this.whitepaperEmail,
  //       firm: this.whitepaperFirm,
  //       timestamp: serverTimestamp(),
  //       status: 'pending'
  //     });
  //     this.whitepaperSuccess = true;
  //   } catch (err) {
  //     console.error('Submission error:', err);
  //     alert('Network transmission failed. Please try again.');
  //   } finally {
  //     this.whitepaperSubmitting = false;
  //   }
  // }

  async downloadWhitepaper() {
    if (!this.whitepaperEmail || !this.whitepaperFirm) return;

    // 1. Silent Logging to Firestore (Sovereign Lead)
    try {
      const leadData = {
        firm: this.whitepaperFirm,
        email: this.whitepaperEmail,
        document: 'Taajirah_Systems_Hub_v2.5_White_Paper',
        timestamp: serverTimestamp(),
        source: 'landing-page-cta'
      };
      
      await addDoc(collection(this.firestore, 'whitepaper_requests'), leadData);
    } catch (err) {
      console.error("[CRITICAL] Failed to log lead to Firestore:", err);
      // We continue with the download even if logging fails for user experience
    }

    // 2. Trigger Download via the hidden link
    if (this.downloadLink) {
      this.downloadLink.nativeElement.click();
    }

    // 3. Update UI
    this.whitepaperSuccess = true;
  }

  constructor(public router: Router, private el: ElementRef, private firestore: Firestore) {}
}

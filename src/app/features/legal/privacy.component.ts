import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="legal-container fade-in">
      <h1 class="vault-gradient-text">POPIA Privacy Notice</h1>
      <p class="last-updated mono">Last Updated: March 22, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>Taajirah Systems ("we", "us", or "our") is committed to protecting your privacy and ensuring that your personal information is processed in accordance with the Protection of Personal Information Act (POPIA) of South Africa.</p>
      </section>

      <section>
        <h2>2. Responsible Party</h2>
        <p>Taajirah Systems is the "responsible party" for the personal information collected through this website.</p>
        <div class="contact-box mono">
          TAAJIRAH SYSTEMS (PTY) LTD<br>
          Roodepoort, Johannesburg, South Africa<br>
          Email: privacy&#64;taajirah.com
        </div>
      </section>

      <section>
        <h2>3. Type of Information Collected</h2>
        <p>We collect the following personal information through our Discovery Form:</p>
        <ul>
          <li>Full Name</li>
          <li>Phone Number (South African)</li>
          <li>Industry and Business hardware information</li>
          <li>Business Pain Points (as provided by you)</li>
        </ul>
      </section>

      <section>
        <h2>4. Purpose of Collection</h2>
        <p>Your information is collected solely for the purpose of initiating a Sovereign AI Strategy Session and providing our professional services to you. We do not use your information for unrelated marketing unless specific consent is obtained.</p>
      </section>

      <section>
        <h2>5. Data Storage & Cross-Border Transfer</h2>
        <p>We use **Google Cloud Platform (Firebase)** to securely store and process your information. While Taajirah Systems is a South African entity, your data is stored in Google's secure global data centers, which may be located outside of South Africa.</p>
        <p>Google Cloud maintains advanced security certifications (ISO 27001, SOC 2/3) and provides an adequate level of data protection as required by Section 72 of POPIA.</p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>We implement technical and organizational measures to secure your data, including:</p>
        <ul>
          <li>Encryption at rest and in transit.</li>
          <li>Public write-only Firestore rules to prevent unauthorized data access.</li>
          <li>Regular audits of our internal data handling procedures.</li>
        </ul>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>Under POPIA, you have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request the correction or deletion of your information.</li>
          <li>Object to the processing of your information.</li>
          <li>Withdraw your consent at any time.</li>
        </ul>
        <p>To exercise these rights, please contact our Information Officer at the details provided above.</p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>We use essential functional cookies to ensure the website operates correctly. We do not use third-party tracking or advertising cookies.</p>
      </section>

      <div class="cta">
        <a href="/" class="btn-link mono">← BACK TO HOME</a>
      </div>
    </div>
  `,
  styles: [`
    .legal-container {
      max-width: 900px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; margin-top: 3rem; color: var(--vault-accent); border-bottom: 1px solid rgba(118,185,0,0.2); padding-bottom: 0.5rem; }
    .last-updated { font-size: 0.75rem; color: var(--vault-muted); margin-bottom: 2rem; }
    p, li { line-height: 1.8; color: #90A4AE; font-size: 1.1rem; margin-bottom: 1rem; }
    ul { padding-left: 1.5rem; margin-bottom: 2rem; }
    
    .contact-box {
      background: rgba(118, 185, 0, 0.05);
      border: 1px dashed rgba(118, 185, 0, 0.3);
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1.5rem 0;
      color: #fff;
    }

    .cta { margin-top: 5rem; text-align: center; }
    .btn-link { 
      color: var(--vault-accent); 
      text-decoration: none; 
      font-weight: 700; 
      border: 1px solid var(--vault-accent);
      padding: 1rem 2rem;
      border-radius: 30px;
      transition: all 0.3s ease;
    }
    .btn-link:hover {
      background: var(--vault-accent);
      color: #000;
    }
  `]
})
export class PrivacyComponent {}

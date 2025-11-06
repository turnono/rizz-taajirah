import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="legal">
      <h1>Terms of Use</h1>
      <p>By using this website, you agree to use the services lawfully, respect intellectual property, and not misuse the platform. Services are provided “as is” without warranties. Liability is limited to the maximum extent permitted by law.</p>
      <p>Contact: <a href="mailto:taajirahsystems@gmail.com">taajirahsystems@gmail.com</a></p>
      <p>Last updated: {{ today | date:'yyyy-MM-dd' }}</p>
    </section>
  `,
  styles: [
    `
      .legal { padding: 2rem; max-width: 900px; margin: 80px auto 2rem; color: #fff; }
      a { color: #36ff9f; }
    `,
  ],
})
export class TermsComponent {
  today = new Date();
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="legal">
      <h1>Privacy Policy</h1>
      <p>We collect only the data necessary to provide our services. This may include contact details you voluntarily submit (e.g., email) and basic analytics to improve the experience. We do not sell your data.</p>
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
export class PrivacyComponent {
  today = new Date();
}

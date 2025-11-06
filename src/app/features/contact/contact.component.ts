import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact">
      <h1>Contact Us</h1>
      <p>Email: <a href="mailto:taajirah0@gmail.com">taajirah0&#64;gmail.com</a></p>
      <p>Region: Cape Town, South Africa</p>
    </section>
  `,
  styles: [
    `
      .contact { padding: 2rem; max-width: 800px; margin: 80px auto 2rem; color: #fff; }
      a { color: #36ff9f; }
    `,
  ],
})
export class ContactComponent {}

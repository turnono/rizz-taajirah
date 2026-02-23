import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

// ─── Config ─────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '27658623499';

@Component({
  selector: 'app-mobility',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, RouterModule],
  template: `
    <ion-content [fullscreen]="true" style="--background: #000;">

      <!-- Hero -->
      <div class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="badge">🚐 Taajirah Mobility</div>
          <h1>Private Trips.<br>Done Right.</h1>
          <p class="hero-sub">
            Professional chauffeur service across the Western Cape. Hyundai Staria — clean, comfortable, on time.
          </p>
          <button class="cta-btn" (click)="scrollToForm()">Book a Trip ↓</button>
        </div>
      </div>

      <!-- Why Us -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Why Taajirah Mobility?</h2>
          <div class="perks-grid">
            <div class="perk-card" *ngFor="let perk of perks">
              <div class="perk-icon">{{ perk.icon }}</div>
              <h3>{{ perk.title }}</h3>
              <p>{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Trip Types -->
      <section class="section trip-types-section">
        <div class="container">
          <h2 class="section-title">We Handle</h2>
          <div class="trips-grid">
            <div class="trip-card" *ngFor="let trip of tripTypes">
              <span class="trip-icon">{{ trip.icon }}</span>
              <span class="trip-label">{{ trip.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Booking Form -->
      <section class="section form-section" id="booking-form">
        <div class="container">
          <h2 class="section-title">Request a Trip</h2>
          <p class="section-sub">Fill in your details and we'll come back to you with a quote — usually within the hour.</p>

          <!-- Success state -->
          <div class="success-card" *ngIf="submitted">
            <div class="success-icon">✅</div>
            <h3>Request Received!</h3>
            <p>We've got your booking request. We'll WhatsApp you shortly with a quote.</p>
            <button class="cta-btn" (click)="resetForm()">Book Another Trip</button>
          </div>

          <!-- Form -->
          <form
            class="booking-form"
            [formGroup]="bookingForm"
            (ngSubmit)="onSubmit()"
            *ngIf="!submitted"
          >
            <div class="form-grid">

              <div class="field">
                <label>Your Name *</label>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="e.g. Abdullah Abrahams"
                  [class.error]="isFieldInvalid('name')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('name')">Name is required</span>
              </div>

              <div class="field">
                <label>WhatsApp / Phone *</label>
                <input
                  type="tel"
                  formControlName="phone"
                  placeholder="+27 82 000 0000"
                  [class.error]="isFieldInvalid('phone')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('phone')">Phone number is required</span>
              </div>

              <div class="field full">
                <label>Pickup Location *</label>
                <input
                  type="text"
                  formControlName="pickup"
                  placeholder="e.g. 12 Long Street, Cape Town"
                  [class.error]="isFieldInvalid('pickup')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('pickup')">Pickup location is required</span>
              </div>

              <div class="field full">
                <label>Drop-off Location *</label>
                <input
                  type="text"
                  formControlName="dropoff"
                  placeholder="e.g. Cape Town International Airport"
                  [class.error]="isFieldInvalid('dropoff')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('dropoff')">Drop-off location is required</span>
              </div>

              <div class="field">
                <label>Date *</label>
                <input
                  type="date"
                  formControlName="date"
                  [min]="minDate"
                  [class.error]="isFieldInvalid('date')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('date')">Please select a date</span>
              </div>

              <div class="field">
                <label>Time *</label>
                <input
                  type="time"
                  formControlName="time"
                  [class.error]="isFieldInvalid('time')"
                />
                <span class="field-error" *ngIf="isFieldInvalid('time')">Please select a time</span>
              </div>

              <div class="field">
                <label>Passengers *</label>
                <select formControlName="passengers" [class.error]="isFieldInvalid('passengers')">
                  <option value="" disabled selected>How many?</option>
                  <option value="1">1 passenger</option>
                  <option value="2">2 passengers</option>
                  <option value="3">3 passengers</option>
                  <option value="4">4 passengers</option>
                  <option value="5">5 passengers</option>
                  <option value="6">6 passengers</option>
                  <option value="7">7 passengers</option>
                  <option value="8+">8+ passengers</option>
                </select>
                <span class="field-error" *ngIf="isFieldInvalid('passengers')">Please select passenger count</span>
              </div>

              <div class="field">
                <label>Trip Type</label>
                <select formControlName="tripType">
                  <option value="airport">Airport transfer</option>
                  <option value="event">Event / function</option>
                  <option value="corporate">Corporate travel</option>
                  <option value="workshop">Workshop / training</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="field full">
                <label>Additional Notes</label>
                <textarea
                  formControlName="notes"
                  rows="3"
                  placeholder="e.g. need a car seat, multiple stops, luggage details..."
                ></textarea>
              </div>

            </div>

            <div class="form-footer">
              <p class="privacy-note">
                📞 We'll contact you via WhatsApp. No spam, ever.
              </p>
              <button
                type="submit"
                class="submit-btn"
                [disabled]="isSubmitting"
              >
                <span *ngIf="!isSubmitting">Request Quote via WhatsApp 💬</span>
                <span *ngIf="isSubmitting">Sending...</span>
              </button>
            </div>

            <div class="form-error-banner" *ngIf="submitError">
              ⚠️ {{ submitError }}
            </div>

          </form>
        </div>
      </section>

      <!-- Footer -->
      <footer class="simple-footer">
        <p>Taajirah Mobility — a division of Taajirah Systems.</p>
        <p><a href="/" class="back-link">← Back to Taajirah</a></p>
      </footer>

    </ion-content>
  `,
  styles: [`
    :host {
      --mobility-accent: #00ff9d;
      --mobility-accent-dim: rgba(0, 255, 157, 0.15);
      --mobility-border: rgba(0, 255, 157, 0.25);
      --wa-green: #25D366;
      --dark: #0a0a0a;
      --card-bg: rgba(15, 15, 15, 0.95);
    }

    /* ── Hero ─────────────────────────────────────────── */
    .hero {
      position: relative;
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4rem 2rem;
      background: radial-gradient(ellipse at 30% 50%, rgba(0,255,157,0.07) 0%, transparent 60%),
                  linear-gradient(160deg, #0a1a0e 0%, #050d08 50%, #000 100%);
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(0,255,157,0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 700px;
    }

    .badge {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      background: var(--mobility-accent-dim);
      color: var(--mobility-accent);
      border: 1px solid var(--mobility-border);
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      color: #fff;
      margin-bottom: 1.25rem;
    }

    .hero-sub {
      font-size: 1.2rem;
      color: #ccc;
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-btn {
      background: var(--mobility-accent);
      color: #000;
      border: none;
      padding: 1rem 2.5rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 20px rgba(0,255,157,0.3);
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,255,157,0.45);
    }

    /* ── Layout ─────────────────────────────────────── */
    .section {
      padding: 5rem 0;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1rem;
      color: #fff;
    }

    .section-sub {
      text-align: center;
      color: #999;
      font-size: 1.05rem;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    /* ── Perks ─────────────────────────────────────── */
    .perks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    .perk-card {
      background: var(--card-bg);
      border: 1px solid var(--mobility-border);
      border-radius: 16px;
      padding: 2rem 1.5rem;
      text-align: center;
      transition: all 0.25s;
    }

    .perk-card:hover {
      border-color: var(--mobility-accent);
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,255,157,0.12);
    }

    .perk-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .perk-card h3 {
      color: #fff;
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
    }

    .perk-card p {
      color: #999;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* ── Trip Types ──────────────────────────────────── */
    .trip-types-section {
      background: rgba(0,255,157,0.02);
    }

    .trips-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .trip-card {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--mobility-accent-dim);
      border: 1px solid var(--mobility-border);
      border-radius: 50px;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      color: #e0e0e0;
      transition: all 0.2s;
    }

    .trip-card:hover {
      border-color: var(--mobility-accent);
      color: #fff;
    }

    .trip-icon { font-size: 1.2rem; }
    .trip-label { font-weight: 500; }

    /* ── Booking Form ────────────────────────────────── */
    .form-section {
      background: rgba(0,20,10,0.3);
    }

    .booking-form {
      background: var(--card-bg);
      border: 1px solid var(--mobility-border);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field.full {
      grid-column: 1 / -1;
    }

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input, select, textarea {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 10px;
      padding: 0.85rem 1rem;
      color: #fff;
      font-size: 1rem;
      transition: border-color 0.2s;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--mobility-accent);
      box-shadow: 0 0 0 3px rgba(0,255,157,0.1);
    }

    input.error, select.error {
      border-color: #ff4d4d;
    }

    input::placeholder, textarea::placeholder { color: #555; }

    select option { background: #111; color: #fff; }

    textarea { resize: vertical; }

    .field-error {
      font-size: 0.8rem;
      color: #ff6b6b;
    }

    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .privacy-note {
      color: #777;
      font-size: 0.875rem;
      margin: 0;
    }

    .submit-btn {
      background: var(--wa-green);
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 16px rgba(37,211,102,0.3);
      min-width: 260px;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37,211,102,0.45);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-error-banner {
      margin-top: 1rem;
      background: rgba(255,77,77,0.1);
      border: 1px solid rgba(255,77,77,0.3);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #ff9999;
      font-size: 0.9rem;
    }

    /* ── Success ─────────────────────────────────────── */
    .success-card {
      background: rgba(0,255,157,0.05);
      border: 1px solid var(--mobility-border);
      border-radius: 20px;
      padding: 4rem 2rem;
      text-align: center;
    }

    .success-icon { font-size: 4rem; margin-bottom: 1rem; }

    .success-card h3 {
      color: var(--mobility-accent);
      font-size: 1.75rem;
      margin-bottom: 0.75rem;
    }

    .success-card p {
      color: #aaa;
      margin-bottom: 2rem;
      font-size: 1.05rem;
    }

    /* ── Footer ──────────────────────────────────────── */
    .simple-footer {
      text-align: center;
      padding: 3rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.07);
      color: #555;
      font-size: 0.9rem;
    }

    .back-link {
      color: var(--mobility-accent);
      text-decoration: none;
    }

    /* ── Responsive ─────────────────────────────────── */
    @media (max-width: 768px) {
      h1 { font-size: 2.4rem; }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .field.full { grid-column: 1; }

      .form-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .submit-btn { min-width: unset; width: 100%; text-align: center; }

      .booking-form { padding: 1.5rem; }
    }

    @media (max-width: 480px) {
      h1 { font-size: 1.9rem; }
      .hero { min-height: 70vh; }
    }
  `],
})
export class MobilityComponent implements OnInit {
  bookingForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  submitError = '';
  minDate = '';

  perks = [
    {
      icon: '🚐',
      title: 'Hyundai Staria',
      desc: 'Spacious, premium MPV. Up to 8 passengers with luggage — no squeeze.',
    },
    {
      icon: '✅',
      title: 'Fully Insured',
      desc: 'Legally covered for private passenger trips. You ride with peace of mind.',
    },
    {
      icon: '⏱️',
      title: 'Punctual',
      desc: 'We track traffic and arrive early. No stressing about pickup times.',
    },
    {
      icon: '💬',
      title: 'WhatsApp First',
      desc: 'All communication is direct. No call centres, no bots — just us.',
    },
  ];

  tripTypes = [
    { icon: '✈️', label: 'Airport Transfers' },
    { icon: '🏢', label: 'Corporate Travel' },
    { icon: '🎓', label: 'Workshops & Training' },
    { icon: '🎬', label: 'Media Production' },
    { icon: '📅', label: 'Events & Functions' },
    { icon: '🛒', label: 'Group Shopping Trips' },
    { icon: '🏥', label: 'Medical Appointments' },
    { icon: '🗺️', label: 'Day Tours' },
  ];

  constructor(private fb: FormBuilder, private firestore: Firestore) { }

  ngOnInit() {
    // Set minimum booking date to today
    this.minDate = new Date().toISOString().split('T')[0];

    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      pickup: ['', Validators.required],
      dropoff: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      passengers: ['', Validators.required],
      tripType: ['airport'],
      notes: [''],
    });
  }

  isFieldInvalid(field: string): boolean {
    const ctrl = this.bookingForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  scrollToForm() {
    const el = document.getElementById('booking-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  async onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    const v = this.bookingForm.value;
    const bookingData = {
      ...v,
      createdAt: serverTimestamp(),
      status: 'pending',
    };

    try {
      // 1. Save to Firestore
      const ref = collection(this.firestore, 'mobility_bookings');
      const docRef = await addDoc(ref, bookingData);

      // 2. Build WhatsApp message
      const msg = this.buildWhatsAppMessage(v, docRef.id);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

      // 3. Show success, then open WhatsApp
      this.submitted = true;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

    } catch (err: any) {
      console.error('Booking submission error:', err);
      this.submitError = 'Something went wrong. Please try again or contact us directly.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private buildWhatsAppMessage(v: any, bookingId: string): string {
    const lines = [
      `🚐 *New Trip Booking — Taajirah Mobility*`,
      `Ref: ${bookingId.slice(0, 8).toUpperCase()}`,
      ``,
      `*Name:* ${v.name}`,
      `*Phone:* ${v.phone}`,
      ``,
      `*Pickup:* ${v.pickup}`,
      `*Drop-off:* ${v.dropoff}`,
      `*Date:* ${v.date}`,
      `*Time:* ${v.time}`,
      `*Passengers:* ${v.passengers}`,
      `*Trip type:* ${v.tripType}`,
      v.notes ? `*Notes:* ${v.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return encodeURIComponent(lines);
  }

  resetForm() {
    this.submitted = false;
    this.bookingForm.reset({ tripType: 'airport' });
  }
}

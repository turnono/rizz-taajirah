import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForward } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <ion-content class="ion-content">
      <!-- Glitch Overlay -->
      <div class="glitch-overlay"></div>

      <!-- Hidden Messages -->
      <div class="hidden-messages">
        <span>A prison with no bars</span>
        <span>The mistake was calculated</span>
        <span>A message not meant to be received</span>
        <span>1000 headman</span>
      </div>

      <!-- Main Content -->
      <main>
        <!-- Hero Section -->
        <section class="hero">
          <h1 class="glitch" data-text="Calculated/Mistake">
            Calculated/Mistake
          </h1>
          <p class="tagline">
            The signal has been sent. Waiting for a receiver.
          </p>
          <div class="signal-animation"></div>
        </section>

        <!-- The Message Section -->
        <section class="message" [class.visible]="isMessageVisible">
          <div class="transmission">
            <p
              class="fragment"
              *ngFor="let fragment of messageFragments; let i = index"
              [style.animation-delay]="i * 0.5 + 's'"
            >
              {{ fragment }}
            </p>
          </div>
          <p class="flicker-text">Have you understood?</p>
        </section>

        <!-- Pre-order Section -->
        <section class="pre-order" [class.visible]="isPreorderVisible">
          <div class="countdown" *ngIf="countdown">
            <p>The first message will be received in</p>
            <div class="timer">{{ countdown }}</div>
          </div>
          <ion-button class="receive-btn" (click)="receiveMessage()">
            Receive the Message
            <ion-icon name="arrow-forward" slot="end"></ion-icon>
          </ion-button>
          <p class="price">₦15,000</p>
        </section>
      </main>
    </ion-content>
  `,
  styles: [
    `
      :host {
        --neon-color: #0ff;
        --background-dark: #000;
        --text-color: #fff;
        --glitch-color: rgba(15, 255, 255, 0.1);
      }

      ion-content {
        --background: var(--background-dark);
        --color: var(--text-color);
      }

      .glitch-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15) 0px,
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        );
        pointer-events: none;
        z-index: 1;
      }

      main {
        min-height: 100vh;
        padding: 2rem;
        position: relative;
        z-index: 2;
      }

      .hero {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .glitch {
        font-size: 4rem;
        font-weight: 800;
        text-transform: uppercase;
        position: relative;
        text-shadow: 0.05em 0 0 var(--glitch-color),
          -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
          0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
        animation: glitch 1s infinite;

        &::before,
        &::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        &::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        &::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }
      }

      .tagline {
        font-size: 1.2rem;
        color: var(--text-color);
        opacity: 0.7;
        margin-top: 2rem;
        font-family: monospace;
        border-right: 2px solid var(--neon-color);
        white-space: nowrap;
        overflow: hidden;
        animation: typing 3.5s steps(40, end),
          blink-caret 0.75s step-end infinite;
      }

      .signal-animation {
        width: 100px;
        height: 100px;
        margin-top: 3rem;
        background: radial-gradient(
            circle,
            transparent 35%,
            var(--neon-color) 36%,
            var(--neon-color) 38%,
            transparent 39%,
            transparent
          ),
          radial-gradient(
              circle,
              transparent 35%,
              var(--neon-color) 36%,
              var(--neon-color) 38%,
              transparent 39%,
              transparent
            )
            50px 50px;
        background-size: 100px 100px;
        animation: signal 4s infinite linear;
        opacity: 0.2;
      }

      .message {
        padding: 4rem 2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;

        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fragment {
        font-family: monospace;
        color: var(--text-color);
        opacity: 0;
        transform: translateX(-20px);
        animation: fadeInSlide 0.5s ease-out forwards;
        margin: 1rem 0;
        font-size: 1.1rem;
      }

      .flicker-text {
        color: var(--neon-color);
        font-size: 1.5rem;
        text-align: center;
        margin-top: 3rem;
        animation: flicker 2s infinite;
      }

      .pre-order {
        padding: 4rem 2rem;
        text-align: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;

        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .receive-btn {
        --background: transparent;
        --background-hover: var(--neon-color);
        --color: var(--neon-color);
        --border-color: var(--neon-color);
        --border-style: solid;
        --border-width: 1px;
        --padding-start: 2rem;
        --padding-end: 2rem;
        --box-shadow: 0 0 10px var(--neon-color);
        font-family: monospace;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 2rem 0;

        &:hover {
          --color: var(--background-dark);
        }
      }

      .price {
        font-size: 1.2rem;
        color: var(--neon-color);
        font-family: monospace;
      }

      .hidden-messages {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 2rem;
        pointer-events: none;
        z-index: 1;

        span {
          color: var(--text-color);
          opacity: 0.05;
          font-size: 0.8rem;
          font-family: monospace;
          transform: rotate(var(--rotation));
          transition: all 0.3s ease;

          &:hover {
            opacity: 0.8;
            transform: scale(1.1) rotate(var(--rotation));
          }

          @for $i from 1 through 4 {
            &:nth-child(#{$i}) {
              --rotation: #{random(10) - 5}deg;
              align-self: #{if($i % 2 == 0, 'flex-start', 'flex-end')};
            }
          }
        }
      }

      @keyframes glitch {
        2%,
        64% {
          transform: translate(2px, 0) skew(0deg);
        }
        4%,
        60% {
          transform: translate(-2px, 0) skew(0deg);
        }
        62% {
          transform: translate(0, 0) skew(5deg);
        }
      }

      @keyframes signal {
        from {
          transform: scale(0);
          opacity: 0.2;
        }
        to {
          transform: scale(3);
          opacity: 0;
        }
      }

      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: var(--neon-color);
        }
      }

      @keyframes fadeInSlide {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes flicker {
        0%,
        19.999%,
        22%,
        62.999%,
        64%,
        64.999%,
        70%,
        100% {
          opacity: 0.99;
          text-shadow: -1px -1px 0 var(--neon-color),
            1px -1px 0 var(--neon-color), -1px 1px 0 var(--neon-color),
            1px 1px 0 var(--neon-color), 0 -2px 8px, 0 0 2px, 0 0 5px #ff7e00,
            0 0 15px #ff4444, 0 0 2px #ff7e00, 0 2px 3px #000;
        }
        20%,
        21.999%,
        63%,
        63.999%,
        65%,
        69.999% {
          opacity: 0.4;
          text-shadow: none;
        }
      }

      @media (max-width: 768px) {
        .glitch {
          font-size: 2.5rem;
        }

        .tagline {
          font-size: 1rem;
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, CommonModule],
})
export class HomeComponent implements OnInit {
  isMessageVisible = false;
  isPreorderVisible = false;
  countdown = '';
  messageFragments = [
    'A prison with no bars.',
    'The mistake was calculated.',
    'A message not meant to be received.',
    '1000 headman.',
  ];

  constructor() {
    addIcons({
      arrowForward,
    });
  }

  ngOnInit() {
    this.initializeCountdown();
    this.handleScroll();
  }

  private initializeCountdown() {
    const releaseDate = new Date('2024-05-01'); // Set your book release date
    this.updateCountdown(releaseDate);
    setInterval(() => this.updateCountdown(releaseDate), 1000);
  }

  private updateCountdown(releaseDate: Date) {
    const now = new Date();
    const diff = releaseDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  private handleScroll() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      this.isMessageVisible = scrollPosition > windowHeight * 0.3;
      this.isPreorderVisible = scrollPosition > windowHeight * 0.6;
    });
  }

  receiveMessage() {
    // Implement your pre-order logic here
    console.log('Message received - initiating pre-order sequence');
  }
}

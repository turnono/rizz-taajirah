import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="noise-overlay"></div>
    <div class="scan-line"></div>

    <ion-content [forceOverscroll]="false" class="ion-content-custom">
      <div class="gif-container">
        <img
          *ngFor="let gif of gifs; let i = index"
          [src]="gif"
          [class.active]="currentGifIndex === i"
          class="background-gif"
          alt="Cyberpunk animation"
        />
        <div class="gif-overlay"></div>
      </div>

      <div class="initial-overlay" [class.fade-out]="canScroll">
        <div class="boot-sequence">
          <div
            class="line"
            *ngFor="let line of bootSequence; let i = index"
            [style.animation-delay]="i * 0.5 + 's'"
          >
            {{ line }}
          </div>
          <div class="instruction" *ngIf="showScrollInstruction">
            > SCROLL TO INITIATE SEQUENCE_
          </div>
        </div>
      </div>

      <main class="dark-theme">
        <section class="hero" [class.fade-out]="heroFaded">
          <div class="hero-content">
            <div class="glitch-container">
              <h1 class="title">
                C<span class="block-container"
                  ><span class="diacritic fatha">َ</span>□</span
                >LC
                <span class="block-container"
                  ><span class="diacritic damma">ُ</span>□</span
                >L
                <span class="block-container"
                  ><span class="diacritic fatha">َ</span>□</span
                >TED<br />
                M<span class="block-container"
                  ><span class="diacritic kasra">ِ</span>□</span
                >ST
                <span class="block-container"
                  ><span class="diacritic fatha">َ</span>□</span
                >KE
              </h1>
            </div>

            <div class="signal-container">
              <div class="signal-info">
                <div class="signal-label">SIGNAL STRENGTH:</div>
                <div class="signal-value">{{ signalStrength }}%</div>
              </div>
              <div class="signal-meter">
                <div class="signal-bar" [style.width.%]="signalStrength"></div>
                <div class="signal-marks">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.paystack.com/pay/fulaan"
              target="_blank"
              class="terminal"
            >
              <div class="line">EMERGENCY PROTOCOL REQUIRED</div>
              <div class="line">COST: ZAR 100</div>
              <div class="line">CLICK TO INITIATE_</div>
            </a>

            <div class="countdown-container">
              <div class="countdown-label">TIME REMAINING:</div>
              <div class="countdown">{{ countdown }}</div>
            </div>
          </div>
        </section>
      </main>
    </ion-content>
  `,
  styles: [
    `
      @use 'sass:math';

      :host {
        --primary-color: #00ff00;
        --error-color: #ff0033;
        --text-color: #ffffff;
        --bg-color: #000000;
        --glitch-color: #0ff;
        --dark-bg: #000000;
        --dark-bg-transparent: rgba(0, 0, 0, 0.95);
        --grid-color: rgba(0, 255, 0, 0.1);
        --title-glow: rgba(0, 255, 255, 0.3);
      }

      .ion-content-custom {
        --background: transparent;
        --color: var(--text-color);
        position: relative;
        z-index: 2;
        background: transparent;
      }

      .noise-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/png;base64,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');
        opacity: 0.03;
        pointer-events: none;
        z-index: 10;
      }

      .scan-line {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          rgba(0, 255, 0, 0.2) 50%,
          transparent 100%
        );
        animation: scan 8s linear infinite;
        pointer-events: none;
        z-index: 10;
      }

      .initial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--bg-color);
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 1s ease;

        &.fade-out {
          opacity: 0;
          pointer-events: none;
        }
      }

      .boot-sequence {
        font-family: monospace;
        color: var(--primary-color);

        .line {
          opacity: 0;
          animation: typeIn 0.5s ease forwards;
          margin-bottom: 0.5rem;

          &::before {
            content: '>';
            margin-right: 0.5rem;
          }
        }

        .instruction {
          margin-top: 2rem;
          animation: blink 1s infinite;
        }
      }

      .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 2rem;
        overflow: hidden;
        transition: opacity 0.5s ease;

        &.fade-out {
          opacity: 0;
        }
      }

      .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 0 1rem;

        @media (max-width: 768px) {
          gap: 1.5rem;
        }
      }

      .glitch-container {
        width: 100%;
        margin-bottom: 0;
        text-align: center;
        margin-top: 50px;

        .title {
          font-size: 2rem;
          font-weight: bold;
          font-family: Arial, sans-serif;
          text-align: center;
          color: #fff;
        }

        .block-container {
          display: inline-block;
          position: relative;
          width: 1em;
          height: 1.2em;
          text-align: center;
        }

        .block {
          font-size: 1.5em;
          line-height: 1;
          display: block;
        }

        .diacritic {
          position: absolute;
          font-size: 1.2em;
          left: 50%;
          transform: translateX(-50%);
          color: red;
        }

        .fatha {
          top: -0.5em;
        }

        .kasra {
          bottom: -0.4em;
        }

        .damma {
          top: -0.5em;
        }
      }

      .signal-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--primary-color);
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);

        @media (max-width: 768px) {
          padding: 0.75rem;
          margin: 0 1rem;
          width: auto;
        }

        .signal-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-family: monospace;
          color: var(--primary-color);

          @media (max-width: 768px) {
            font-size: 0.9rem;
          }

          .signal-label {
            font-size: 0.9rem;
            opacity: 0.8;

            @media (max-width: 768px) {
              font-size: 0.8rem;
            }
          }

          .signal-value {
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 5px var(--primary-color);

            @media (max-width: 768px) {
              font-size: 0.9rem;
            }
          }
        }

        .signal-meter {
          position: relative;
          background: rgba(0, 255, 0, 0.1);
          height: 4px;
          border: 1px solid rgba(0, 255, 0, 0.3);

          .signal-bar {
            height: 100%;
            background: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
            transition: width 0.5s ease;
          }

          .signal-marks {
            position: absolute;
            top: 8px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            font-family: monospace;
            font-size: 0.7rem;
            color: var(--primary-color);
            opacity: 0.6;

            @media (max-width: 768px) {
              font-size: 0.6rem;
            }

            span {
              position: relative;
              padding-top: 8px;

              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 4px;
                width: 1px;
                background: var(--primary-color);
                opacity: 0.5;
              }
            }
          }
        }
      }

      .content-sections {
        position: relative;
        z-index: 2;
        padding: 2rem;
        min-height: 100vh;
      }

      .transmission-log {
        position: relative;
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto 4rem;
        background: var(--dark-bg-transparent);
        border: 1px solid var(--grid-color);
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
        min-height: 80vh;

        .log-entry {
          position: relative;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.7);
          border-left: 2px solid var(--primary-color);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;

          &.visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .final-transmission {
        position: relative;
        padding: 4rem 2rem;
        text-align: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
        background: var(--dark-bg-transparent);
        border: 1px solid var(--grid-color);
        margin: 0 auto;
        max-width: 800px;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;

        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .dark-theme {
        background: transparent;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }

      main {
        position: relative;
        z-index: 3;

        &::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              var(--grid-color) 2px,
              var(--grid-color) 4px
            );
          pointer-events: none;
          z-index: -1;
        }
      }

      .transmission-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          45deg,
          transparent 0%,
          rgba(0, 255, 0, 0.03) 50%,
          transparent 100%
        );
        pointer-events: none;
      }

      .warning {
        position: relative;
        margin-bottom: 2rem;

        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--error-color),
            transparent
          );
        }

        .warning-symbol {
          font-size: 3rem;
          color: var(--error-color);
          margin-bottom: 1rem;
          animation: pulse 2s infinite;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .warning-text {
          color: var(--error-color);
          font-family: monospace;
          font-size: 1.2rem;
          text-shadow: 0 0 5px rgba(255, 0, 0, 0.3);
        }
      }

      .terminal {
        display: block;
        text-decoration: none;
        background: rgba(0, 20, 0, 0.9);
        padding: 1.5rem;
        margin: 2rem auto;
        max-width: 400px;
        border: 1px solid var(--primary-color);
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 0 25px rgba(0, 255, 0, 0.2);
          transform: translateY(-2px);
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--primary-color),
            transparent
          );
        }

        .line {
          color: var(--primary-color);
          font-family: monospace;
          margin-bottom: 0.8rem;
          text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);

          &:last-child {
            animation: blink 1s infinite;
          }
        }
      }

      .countdown-container {
        margin: 2rem auto;
        max-width: 400px;
        text-align: center;
      }

      .countdown-label {
        font-size: 1.2rem;
        color: var(--glitch-color);
        text-shadow: 0 0 3px var(--glitch-color);
        margin-bottom: 0.5rem;
      }

      .countdown {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        text-shadow: 0 0 5px var(--primary-color);
      }

      @keyframes scan {
        0% {
          transform: translateY(-100vh);
        }
        100% {
          transform: translateY(100vh);
        }
      }

      @keyframes typeIn {
        to {
          opacity: 1;
        }
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      @keyframes glitchText {
        0% {
          opacity: 0;
          transform: skew(20deg);
        }
        20% {
          opacity: 1;
          transform: skew(-20deg);
        }
        40% {
          opacity: 0.8;
          transform: skew(10deg);
        }
        100% {
          opacity: 1;
          transform: skew(0deg);
        }
      }

      @keyframes gridPulse {
        0%,
        100% {
          opacity: 0.1;
        }
        50% {
          opacity: 0.2;
        }
      }

      @keyframes textFlicker {
        0% {
          opacity: 0.8;
        }
        2% {
          opacity: 1;
        }
        8% {
          opacity: 0.1;
        }
        9% {
          opacity: 1;
        }
        12% {
          opacity: 0.1;
        }
        20% {
          opacity: 1;
        }
        25% {
          opacity: 0.3;
        }
        30% {
          opacity: 1;
        }
        70% {
          opacity: 0.7;
        }
        72% {
          opacity: 0.2;
        }
        77% {
          opacity: 0.9;
        }
        100% {
          opacity: 0.9;
        }
      }

      @keyframes glitch-1 {
        0% {
          clip: rect(132px, auto, 101px, 30px);
        }
        5% {
          clip: rect(17px, auto, 94px, 30px);
        }
        10% {
          clip: rect(40px, auto, 66px, 30px);
        }
        15% {
          clip: rect(87px, auto, 82px, 30px);
        }
        20% {
          clip: rect(137px, auto, 61px, 30px);
        }
        25% {
          clip: rect(34px, auto, 14px, 30px);
        }
        30% {
          clip: rect(133px, auto, 74px, 30px);
        }
        35% {
          clip: rect(76px, auto, 107px, 30px);
        }
        40% {
          clip: rect(59px, auto, 130px, 30px);
        }
        45% {
          clip: rect(29px, auto, 84px, 30px);
        }
        50% {
          clip: rect(22px, auto, 67px, 30px);
        }
        55% {
          clip: rect(67px, auto, 62px, 30px);
        }
        60% {
          clip: rect(10px, auto, 105px, 30px);
        }
        65% {
          clip: rect(78px, auto, 115px, 30px);
        }
        70% {
          clip: rect(105px, auto, 13px, 30px);
        }
        75% {
          clip: rect(15px, auto, 75px, 30px);
        }
        80% {
          clip: rect(66px, auto, 39px, 30px);
        }
        85% {
          clip: rect(133px, auto, 73px, 30px);
        }
        90% {
          clip: rect(36px, auto, 128px, 30px);
        }
        95% {
          clip: rect(68px, auto, 103px, 30px);
        }
        100% {
          clip: rect(14px, auto, 100px, 30px);
        }
      }

      @keyframes glitch-2 {
        0% {
          clip: rect(129px, auto, 36px, 30px);
        }
        5% {
          clip: rect(36px, auto, 4px, 30px);
        }
        10% {
          clip: rect(85px, auto, 66px, 30px);
        }
        15% {
          clip: rect(91px, auto, 91px, 30px);
        }
        20% {
          clip: rect(148px, auto, 138px, 30px);
        }
        25% {
          clip: rect(38px, auto, 122px, 30px);
        }
        30% {
          clip: rect(69px, auto, 54px, 30px);
        }
        35% {
          clip: rect(98px, auto, 71px, 30px);
        }
        40% {
          clip: rect(146px, auto, 34px, 30px);
        }
        45% {
          clip: rect(134px, auto, 43px, 30px);
        }
        50% {
          clip: rect(102px, auto, 80px, 30px);
        }
        55% {
          clip: rect(119px, auto, 44px, 30px);
        }
        60% {
          clip: rect(106px, auto, 99px, 30px);
        }
        65% {
          clip: rect(141px, auto, 74px, 30px);
        }
        70% {
          clip: rect(20px, auto, 78px, 30px);
        }
        75% {
          clip: rect(133px, auto, 79px, 30px);
        }
        80% {
          clip: rect(78px, auto, 52px, 30px);
        }
        85% {
          clip: rect(35px, auto, 39px, 30px);
        }
        90% {
          clip: rect(67px, auto, 70px, 30px);
        }
        95% {
          clip: rect(71px, auto, 103px, 30px);
        }
        100% {
          clip: rect(83px, auto, 40px, 30px);
        }
      }

      .gif-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        overflow: hidden;
      }

      .background-gif {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        z-index: 1;

        &.active {
          opacity: 0.4;
        }
      }

      .gif-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.6)
        );
        z-index: 2;
      }
    `,
  ],
  standalone: true,
  imports: [IonContent, CommonModule],
})
export class HomeComponent implements OnInit, AfterViewInit {
  canScroll = false;
  heroFaded = false;
  isPreorderVisible = false;
  showScrollInstruction = false;
  signalStrength = 0;
  countdown = '';
  currentGifIndex = 0;
  gifs = [
    'assets/gifs/Futuristic_Cyber_Glitch.gif',
    'assets/gifs/Transmission_Mystery.gif',
    'assets/gifs/Abandoned_Prison.gif',
  ];

  bootSequence = [
    'INITIALIZING SYSTEM...',
    'ESTABLISHING SECURE CONNECTION...',
    'DECRYPTING PROTOCOLS...',
    'ACCESS GRANTED...',
    'LOADING TRANSMISSION DATA...',
  ];

  constructor() {}

  ngOnInit() {
    // Reset all state
    this.canScroll = false;
    this.heroFaded = false;
    this.isPreorderVisible = false;
    this.showScrollInstruction = false;
    this.signalStrength = 0;
    this.startGifSequence();
  }

  ngAfterViewInit() {
    // Ensure we're at the top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Start initialization sequence after view is ready
    setTimeout(() => {
      this.initializeSequence();
      this.initializeCountdown();

      setTimeout(() => {
        this.onScroll();
        setInterval(() => {
          this.onScroll();
        }, 1000);
      }, 1000);
    }, 100);
  }

  private initializeSequence() {
    this.bootSequence.forEach((_, index) => {
      setTimeout(() => {
        if (index === this.bootSequence.length - 1) {
          setTimeout(() => {
            this.showScrollInstruction = true;
            setTimeout(() => {
              this.canScroll = true;
              this.onScroll();
            }, 1000);
          }, 500);
        }
      }, index * 500);
    });

    setInterval(() => {
      this.signalStrength = Math.floor(Math.random() * 30) + 70;
    }, 2000);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.canScroll) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    this.heroFaded = scrollPosition > windowHeight * 0.1;

    if (scrollPosition > windowHeight * 1.5) {
      this.isPreorderVisible = true;
    }
  }

  private initializeCountdown() {
    const releaseDate = new Date('2024-05-01');
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

    this.countdown = `${days}:${hours}:${minutes}:${seconds}`;
  }

  private startGifSequence() {
    console.log('Starting GIF sequence with:', this.gifs);
    setInterval(() => {
      this.currentGifIndex = (this.currentGifIndex + 1) % this.gifs.length;
      console.log('Current GIF:', this.gifs[this.currentGifIndex]);
    }, 5000); // Change GIF every 5 seconds
  }
}

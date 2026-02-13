import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visual-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="terminal-overlay" [class.open]="isOpen">
      
      <!-- Toggle Button (Always visible when closed) -->
      <button class="toggle-btn" (click)="toggleTerminal()" *ngIf="!isOpen">
        <span class="pulse">●</span> TAAJIRAH_AGENT
      </button>

      <!-- The Terminal Window -->
      <div class="terminal-window" *ngIf="isOpen">
        <div class="scanline"></div>
        <div class="header-bar">
          <span class="status">SYSTEM ONLINE // TAAJIRAH NET</span>
          <button class="close-btn" (click)="toggleTerminal()">[X]</button>
        </div>

        <div class="ascii-art glitch" data-text="TAAJIRAH">
   _______           _ _           _     
  |__   __|         (_|_)         | |    
     | | __ _  __ _  _ _ _ __ __ _| |__  
     | |/ _\` |/ _\` || | | '__/ _\` | '_ \\ 
     | | (_| | (_| || | | | | (_| | | | |
     |_|\\__,_|\\__,_|/ |_|_|  \\__,_|_| |_|
                  |__/                   
        </div>

        <div class="output-area" #outputArea>
          <div *ngFor="let log of logs" [ngClass]="log.type">
            <span class="prefix" *ngIf="log.type === 'user'">> </span>
            <span class="prefix" *ngIf="log.type === 'agent'">[AGENT]: </span>
            {{ log.text }}
          </div>
        </div>

        <div class="input-area">
          <span class="prompt">></span>
          <input 
            #cmdInput
            type="text" 
            [(ngModel)]="command" 
            (keydown.enter)="processCommand()"
            placeholder="Enter command..."
            autocomplete="off"
            autofocus
          >
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: 'Courier New', Courier, monospace;
    }

    .toggle-btn {
      background: #000;
      color: #00ff41;
      border: 1px solid #00ff41;
      padding: 10px 20px;
      font-family: inherit;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
      transition: all 0.3s ease;
    }

    .toggle-btn:hover {
      background: #002200;
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
    }

    .pulse {
      animation: blink 1s infinite;
    }

    .terminal-window {
      width: 400px;
      height: 500px;
      background: rgba(5, 5, 5, 0.95);
      border: 1px solid #00ff41;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
      position: relative;
      overflow: hidden;
    }

    .header-bar {
      background: #00ff41;
      color: #000;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 12px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }

    .ascii-art {
      color: #008f11;
      font-size: 8px;
      white-space: pre;
      text-align: center;
      margin: 10px 0;
      opacity: 0.8;
    }

    .output-area {
      flex-grow: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
      color: #fff;
    }

    .log-line { margin-bottom: 5px; }
    .system { color: #008f11; }
    .user { color: #fff; }
    .agent { color: #00ff41; text-shadow: 0 0 5px #00ff41; }
    .error { color: #ff3333; }

    .input-area {
      display: flex;
      border-top: 1px solid #008f11;
      padding: 10px;
    }

    .prompt {
      color: #00ff41;
      margin-right: 10px;
    }

    input {
      background: transparent;
      border: none;
      color: #fff;
      font-family: inherit;
      width: 100%;
      outline: none;
    }

    /* CRT Scanline */
    .scanline {
      width: 100%;
      height: 100px;
      z-index: 10;
      background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0, 255, 65, 0.04) 50%, rgba(0,0,0,0) 100%);
      opacity: 0.1;
      position: absolute;
      bottom: 100%;
      animation: scanline 10s linear infinite;
      pointer-events: none;
    }

    @keyframes scanline {
      0% { bottom: 100%; }
      80% { bottom: 100%; }
      100% { bottom: -100%; }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #008f11; }
  `]
})
export class VisualAgentComponent implements AfterViewInit {
  isOpen = false;
  command = '';
  logs: { text: string, type: 'system' | 'user' | 'agent' | 'error' }[] = [
    { text: 'Initializing secure connection...', type: 'system' },
    { text: 'Taajirah Systems Agent v1.0 ONLINE', type: 'system' }
  ];

  @ViewChild('outputArea') outputArea!: ElementRef;
  @ViewChild('cmdInput') cmdInput!: ElementRef;

  toggleTerminal() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.cmdInput.nativeElement.focus(), 100);
    }
  }

  processCommand() {
    if (!this.command.trim()) return;

    // Log User Command
    this.logs.push({ text: this.command, type: 'user' });
    const cmd = this.command.toLowerCase().trim();
    this.command = ''; // Clear input

    this.scrollToBottom();

    // "Thinking" Delay
    setTimeout(() => {
      this.handleLogic(cmd);
      this.scrollToBottom();
    }, 500 + Math.random() * 500);
  }

  handleLogic(cmd: string) {
    let response = '';
    let type: 'agent' | 'error' | 'system' = 'agent';

    if (cmd.includes('hello') || cmd.includes('hi')) {
      response = 'Greetings. I am the digital guardian of Taajirah Systems.';
    } else if (cmd.includes('who are you')) {
      response = 'I am a Visual Agent. I serve the family business. I see all.';
    } else if (cmd.includes('hadiya')) {
      response = 'Hadiya is our AI Gift Finder. A tool of pure light. Visit: hadiya.web.app';
    } else if (cmd.includes('help')) {
      response = 'Commands: HELLO, WHO, HADIYA, VISIONARY, CLEAR';
      type = 'system';
    } else if (cmd.includes('clear')) {
      this.logs = [];
      response = 'Console cleared.';
      type = 'system';
    } else if (cmd.includes('visionary')) {
      response = 'Visionary Clones: The engine of creation. We generate reality from thought.';
    } else {
      response = 'Unknown command. Syntax error in reality matrix.';
      type = 'error';
    }

    this.logs.push({ text: response, type: type });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.outputArea) {
        this.outputArea.nativeElement.scrollTop = this.outputArea.nativeElement.scrollHeight;
      }
    }, 0);
  }

  ngAfterViewInit() {
    // Initial scroll
  }
}

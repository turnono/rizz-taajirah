import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { SupplyService } from '../../core/services/supply.service';
import { SupplySelectionService } from '../../core/services/supply-selection.service';
import { SupplyProduct } from '../../core/models/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [CommonModule, IonContent, RouterModule],
  template: `
    <ion-content [fullscreen]="true" style="--background: #000;">
      <!-- Hero Section -->
      <div class="supply-hero">
        <div class="hero-bg-container">
          <div class="hero-overlay"></div>
          <img src="assets/hero/hero-branded.jpg" class="hero-bg" alt="Taajirah Supply Background">
        </div>
        
        <div class="hero-content">
          <div class="coming-soon-pill">🚧 COMING SOON</div>
          <div class="badge">Taajirah Supply</div>
          <h1>Business Essentials.<br>Delivered Today.</h1>
          <p class="hero-sub">Same-day delivery of office and packaging supplies for businesses. No drama. Just done.</p>
          <div class="hero-actions">
            <!-- Scroll to Catalog -->
            <button (click)="scrollToCatalog()" class="cta-button primary">
               Browse Catalog 👇
            </button>
          </div>
        </div>
      </div>

      <!-- Value Props -->
      <section class="section value-props">
        <div class="container">
          <h2 class="section-title">Why Taajirah Supply?</h2>
          <div class="grid-3">
            <div class="prop-card">
              <div class="icon">⚡</div>
              <h3>Speed</h3>
              <p>Get your supplies today, not in 2-4 days. We fill the gap when you run out unexpectedly.</p>
            </div>
            <div class="prop-card">
              <div class="icon">🛍️</div>
              <h3>Convenience</h3>
              <p>Don't waste staff time driving to wholesalers. We source from Makro, WestPack, and PNA for you.</p>
            </div>
            <div class="prop-card">
              <div class="icon">🚐</div>
              <h3>Reliability</h3>
              <p>Delivered in our Staria. Professional service, proper invoices, and zero hassle.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Catalog Section -->
      <section class="section catalog-section" id="catalog">
        <div class="container">
          <h2 class="section-title">What We Deliver</h2>
          <p class="section-sub">Top 40 essential items businesses run out of daily.</p>
          
          <div class="catalog-filters">
            <button class="filter-btn" [class.active]="activeCategory === 'all'" (click)="setCategory('all')">All</button>
            <button class="filter-btn" [class.active]="activeCategory === 'office'" (click)="setCategory('office')">Office</button>
            <button class="filter-btn" [class.active]="activeCategory === 'packaging'" (click)="setCategory('packaging')">Packaging</button>
             <button class="filter-btn" [class.active]="activeCategory === 'tech'" (click)="setCategory('tech')">Tech</button>
          </div>

          <div class="catalog-grid">
            <ng-container *ngFor="let product of filteredProducts$ | async">
               <div class="product-item" [class.selected]="getQty(product.id) > 0">
                  <div class="prod-icon">{{ product.image }}</div>
                  <div class="prod-details">
                    <h4>{{ product.name }}</h4>
                    <span class="unit">{{ product.unit }}</span>
                    <p>{{ product.description }}</p>
                  </div>
                  
                  <div class="prod-actions">
                    <div class="price-tag">R{{ product.price }}</div>
                    
                    <!-- Add / Remove Controls -->
                    <div class="qty-control" *ngIf="getQty(product.id) > 0; else addButton">
                        <button class="qty-btn" (click)="remove(product)">-</button>
                        <span class="qty-val">{{ getQty(product.id) }}</span>
                        <button class="qty-btn" (click)="add(product)">+</button>
                    </div>
                    <ng-template #addButton>
                        <button class="add-btn" (click)="add(product)">Add +</button>
                    </ng-template>
                  </div>
               </div>
            </ng-container>
          </div>
        </div>
      </section>

      <footer class="simple-footer">
        <p>Taajirah Supply — A division of Taajirah Systems.</p>
        <p class="contact-line">Get in touch: <a href="mailto:taajirah0&#64;gmail.com">taajirah0&#64;gmail.com</a></p>
      </footer>
    </ion-content>

    <!-- Floating Request Bar -->
    <div class="request-bar" *ngIf="!selectionService.isEmpty()">
        <div class="bar-content">
            <div class="bar-info">
                <span class="count">{{ selectionService.count() }} items</span>
                <span class="label">in Request List</span>
            </div>
            <a [href]="whatsAppLink" target="_blank" class="checkout-btn">
                Request Delivery via WhatsApp 💬
            </a>
        </div>
    </div>
  `,
  styles: [`
    :host {
      --supply-blue: #3dc2ff;
      --supply-dark: #0a0a0a;
      --supply-text: #ffffff;
      --gray-light: #2a2a2a;
      --success-green: #25D366;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .section {
      padding: 4rem 0;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-align: center;
      background: linear-gradient(90deg, #fff, #aaa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .section-sub {
      text-align: center;
      color: #aaa;
      margin-bottom: 3rem;
      font-size: 1.1rem;
    }

    /* Hero */
    .supply-hero {
      position: relative;
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      overflow: hidden;
    }

    .hero-bg-container {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      z-index: 0;
    }

    .hero-bg {
      width: 100%; height: 100%; object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }

    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(61, 194, 255, 0.2);
      color: var(--supply-blue);
      border: 1px solid rgba(61, 194, 255, 0.4);
      border-radius: 50px;
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }

    .coming-soon-pill {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: #ffc409;
      color: #000;
      border-radius: 50px;
      font-weight: 800;
      margin-bottom: 1rem;
      margin-right: 1rem;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
      box-shadow: 0 4px 15px rgba(255, 196, 9, 0.4);
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: #fff;
    }

    .hero-sub {
      font-size: 1.25rem;
      color: #f0f0f0;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      background: var(--supply-blue);
      color: #000;
      padding: 1rem 2rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      text-decoration: none;
      font-size: 1.1rem;
      transition: transform 0.2s;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }

    /* Value Props */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .prop-card {
      background: rgba(20, 20, 20, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      transition: transform 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .prop-card:hover {
      transform: translateY(-5px);
      border-color: var(--supply-blue);
    }

    .prop-card .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .prop-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    .prop-card p {
      color: #d0d0d0;
      line-height: 1.6;
      font-size: 1.05rem;
    }

    /* Catalog */
    .catalog-section {
       min-height: 600px;
       padding-bottom: 120px; /* Space for floating bar */
    }

    .catalog-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
      color: #ccc;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn.active, .filter-btn:hover {
       background: var(--supply-blue);
       color: #000;
       border-color: var(--supply-blue);
       font-weight: 600;
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    
    .product-item {
      background: #111;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column; /* Stack details and actions */
      gap: 1rem;
      transition: all 0.2s;
      position: relative;
    }

    .product-item.selected {
        border-color: var(--supply-blue);
        background: #1a1a1a;
    }

    /* Layout: Icon + Text */
    .product-item > .prod-icon {
      float: left; 
    }
    
    /* Flex container for the top part (Icon + Details) */
    .product-item {
       display: flex;
       flex-direction: row; 
       align-items: center;
    }

    .prod-icon {
      font-size: 2.2rem;
      width: 50px;
      text-align: center;
      flex-shrink: 0;
    }

    .prod-details {
      flex: 1;
      padding-right: 0.5rem;
    }

    .prod-details h4 {
      margin: 0 0 0.2rem 0;
      color: #fff;
      font-size: 1.05rem;
      font-weight: 600;
    }
    
    .prod-details .unit {
      font-size: 0.75rem;
      color: var(--supply-blue);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 0.3rem;
    }

    .prod-details p {
       margin: 0;
       color: #888;
       font-size: 0.85rem;
       line-height: 1.3;
       display: -webkit-box;
       -webkit-line-clamp: 2;
       -webkit-box-orient: vertical;
       overflow: hidden;
    }

    /* Actions Column (Price + Button) */
    .prod-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      min-width: 90px;
    }

    .price-tag {
      font-weight: 700;
      color: #fff;
      font-size: 1.1rem;
    }

    .add-btn {
        background: rgba(255,255,255,0.1);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
        white-space: nowrap;
    }
    
    .add-btn:hover {
        background: #fff;
        color: #000;
    }

    /* Qty Control */
    .qty-control {
        display: flex;
        align-items: center;
        background: var(--supply-blue);
        border-radius: 6px;
        overflow: hidden;
    }

    .qty-btn {
        background: transparent;
        border: none;
        color: #000;
        width: 30px;
        height: 28px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
    }
    
    .qty-btn:active { background: rgba(0,0,0,0.1); }

    .qty-val {
        color: #000;
        font-weight: 700;
        min-width: 20px;
        text-align: center;
        font-size: 0.9rem;
    }

    /* Floating Bar */
    .request-bar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 600px;
        background: rgba(30, 30, 30, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid var(--supply-blue);
        border-radius: 12px;
        padding: 1rem;
        z-index: 1000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }

    .bar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bar-info {
        display: flex;
        flex-direction: column;
    }

    .bar-info .count {
        color: var(--supply-blue);
        font-weight: 800;
        font-size: 1.1rem;
    }

    .bar-info .label {
        color: #888;
        font-size: 0.8rem;
    }

    .checkout-btn {
        background: var(--success-green);
        color: white;
        text-decoration: none;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        transition: transform 0.2s;
    }

    .checkout-btn:active { transform: scale(0.95); }

    .simple-footer {
      text-align: center;
      padding: 3rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: #666;
      margin-top: 4rem;
    }

    .simple-footer a {
      color: var(--supply-blue);
      text-decoration: none;
    }

    @media (max-width: 768px) {
      h1 { font-size: 2.5rem; }
    }
  `]
})
export class SupplyComponent implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  products$: Observable<SupplyProduct[]> | null = null;
  filteredProducts$: Observable<SupplyProduct[]> | null = null;
  activeCategory: string = 'all';

  constructor(
    private supplyService: SupplyService,
    public selectionService: SupplySelectionService // Public for template
  ) {}

  ngOnInit() {
    this.products$ = this.supplyService.getCatalog();
    this.filteredProducts$ = this.products$;
  }

  setCategory(cat: 'office' | 'packaging' | 'tech' | 'cleaning' | 'all') {
    this.activeCategory = cat;
    if (cat === 'all') {
      this.filteredProducts$ = this.products$;
    } else {
      this.filteredProducts$ = this.supplyService.getProductsByCategory(cat);
    }
  }

  // --- Selection Logic ---
  add(product: SupplyProduct) {
    this.selectionService.add(product);
  }

  remove(product: SupplyProduct) {
    this.selectionService.remove(product);
  }

  getQty(productId: string) {
    return this.selectionService.getQuantity(productId);
  }
  
  get whatsAppLink() {
    return this.selectionService.getWhatsAppLink();
  }
  
  scrollToCatalog() {
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
  }

  ionViewDidEnter() {
    // Small timeout to ensure the transition is fully complete and layout is calculated
    setTimeout(() => {
      this.content.scrollToPoint(0, 0, 0);
    }, 10);
  }
}

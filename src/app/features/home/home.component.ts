import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonImg,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowForward,
  book,
  school,
  bagHandle,
  codeSlash,
  globe,
  construct,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Taajirah</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" color="dark">
      <!-- Hero Section -->
      <section class="hero">
        <h1>Welcome to Taajirah</h1>
        <p class="subtitle">
          Your technology and e-commerce destination for digital products,
          learning resources, and professional services
        </p>
        <ion-button
          color="light"
          fill="outline"
          size="large"
          routerLink="/store"
        >
          EXPLORE NOW
          <ion-icon name="arrow-forward" slot="end"></ion-icon>
        </ion-button>
      </section>

      <div class="content-grid">
        <!-- Featured Digital Products Section -->
        <section class="featured-section">
          <h2>Digital Products</h2>
          <div class="featured-book">
            <div class="book-image">
              <ion-img
                src="assets/images/book-placeholder.jpg"
                alt="Digital Products"
              ></ion-img>
            </div>
            <div class="book-details">
              <h3>Premium Digital Resources</h3>
              <p>
                Access our collection of high-quality digital products,
                templates, and resources to accelerate your projects.
              </p>
              <ion-button color="light" fill="outline" routerLink="/books">
                VIEW PRODUCTS
                <ion-icon name="book" slot="end"></ion-icon>
              </ion-button>
            </div>
          </div>
        </section>

        <!-- Latest Courses Section -->
        <section class="featured-section">
          <h2>Learning Resources</h2>
          <div class="courses-grid">
            <div class="course-card">
              <ion-img
                src="assets/images/courses/taajirah_learn_small.png"
                alt="Web Development"
              ></ion-img>
              <h3>Web Development</h3>
              <p>Master modern web technologies</p>
            </div>
            <div class="course-card">
              <ion-img
                src="assets/images/courses/taajirah_learn_small.png"
                alt="Digital Skills"
              ></ion-img>
              <h3>Digital Skills</h3>
              <p>Essential skills for the digital age</p>
            </div>
          </div>
          <ion-button
            color="light"
            fill="outline"
            class="view-all"
            routerLink="/courses"
          >
            VIEW ALL COURSES
            <ion-icon name="school" slot="end"></ion-icon>
          </ion-button>
        </section>

        <!-- Featured Products Section -->
        <section class="featured-section">
          <h2>Featured Products</h2>
          <div class="products-grid">
            <div class="product-card">
              <ion-img
                src="assets/images/perfume-1a.jpg"
                alt="Premium Product"
              ></ion-img>
              <h3>Premium Product</h3>
              <p class="price">₦15,000</p>
            </div>
            <div class="product-card">
              <ion-img
                src="assets/images/tshirt-1a.jpg"
                alt="Featured Item"
              ></ion-img>
              <h3>Featured Item</h3>
              <p class="price">₦7,500</p>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section class="featured-section">
          <h2>Tech Services</h2>
          <div class="services-grid">
            <div class="service-card">
              <ion-icon name="globe"></ion-icon>
              <h3>Web Development</h3>
              <p>Custom web solutions</p>
            </div>
            <div class="service-card">
              <ion-icon name="construct"></ion-icon>
              <h3>Tech Consulting</h3>
              <p>Expert technical guidance</p>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  `,
  styles: [
    `
      :host {
        --dark-bg: #1a1a1a;
        --card-bg: #242424;
        --text-primary: #ffffff;
        --text-secondary: rgba(255, 255, 255, 0.7);
        --accent-color: #3880ff;
        --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        --card-hover-transform: translateY(-4px);
      }

      ion-content {
        --background: var(--dark-bg);
        --padding-top: 0;
        --padding-bottom: 4rem;
      }

      .hero {
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 4rem;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url('/assets/images/hero/hero-bg.jpg') center/cover;
        border-radius: 0;
        margin: -1rem -1rem 4rem -1rem;
        position: relative;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(transparent, var(--dark-bg));
        }

        h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
          position: relative;
          z-index: 1;
        }

        .subtitle {
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 600px;
          position: relative;
          z-index: 1;
        }

        ion-button {
          position: relative;
          z-index: 1;
          --padding-start: 2rem;
          --padding-end: 2rem;
          height: 3.5rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
      }

      .content-grid {
        display: grid;
        gap: 4rem;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .featured-section {
        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;

          &::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 2px;
          }
        }
      }

      .featured-book {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        background: var(--card-bg);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        transition: all 0.3s ease;

        &:hover {
          transform: var(--card-hover-transform);
        }

        .book-image {
          height: 500px;
          position: relative;
          overflow: hidden;

          ion-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
        }

        .book-details {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;

          h3 {
            font-size: 2.2rem;
            font-weight: 700;
            line-height: 1.2;
            margin: 0;
          }

          p {
            color: var(--text-secondary);
            line-height: 1.8;
            font-size: 1.1rem;
          }

          ion-button {
            align-self: flex-start;
            --padding-start: 2rem;
            --padding-end: 2rem;
            height: 3rem;
            font-weight: 600;
          }
        }
      }

      .courses-grid,
      .products-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .course-card,
      .product-card {
        background: var(--card-bg);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        transition: all 0.3s ease;

        &:hover {
          transform: var(--card-hover-transform);
        }

        ion-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 1.5rem 0.5rem;
        }

        p {
          color: var(--text-secondary);
          margin: 0 1.5rem 1.5rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .price {
          color: var(--accent-color);
          font-weight: 700;
          font-size: 1.2rem;
        }
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .service-card {
        background: var(--card-bg);
        border-radius: 16px;
        padding: 2.5rem;
        text-align: center;
        box-shadow: var(--card-shadow);
        transition: all 0.3s ease;

        &:hover {
          transform: var(--card-hover-transform);
        }

        ion-icon {
          font-size: 3rem;
          color: var(--accent-color);
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1rem;
        }
      }

      .view-all {
        width: 100%;
        margin-top: 2rem;
        --padding-top: 1rem;
        --padding-bottom: 1rem;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      @media (max-width: 992px) {
        .hero {
          height: 60vh;
          padding: 2rem;

          h1 {
            font-size: 3rem;
          }

          .subtitle {
            font-size: 1.2rem;
          }
        }

        .featured-book {
          grid-template-columns: 1fr;

          .book-image {
            height: 300px;
          }

          .book-details {
            padding: 2rem;

            h3 {
              font-size: 1.8rem;
            }
          }
        }

        .content-grid {
          gap: 3rem;
        }
      }

      @media (max-width: 768px) {
        .courses-grid,
        .products-grid,
        .services-grid {
          grid-template-columns: 1fr;
        }

        .featured-section h2 {
          font-size: 2rem;
        }

        .service-card {
          padding: 2rem;
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonMenuButton,
    IonButtons,
    IonImg,
    RouterLink,
  ],
})
export class HomeComponent {
  constructor() {
    addIcons({
      arrowForward,
      book,
      school,
      bagHandle,
      codeSlash,
      globe,
      construct,
    });
  }
}

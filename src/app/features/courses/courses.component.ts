import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonChip,
  IonLabel,
  IonMenuButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { CartService } from '../../core/services/cart.service';
import { Course } from '../../core/models/interfaces';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-courses',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Our Courses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Islamic Education</h1>
      <p>Enhance your knowledge with our comprehensive courses</p>

      <div class="category-section">
        <h2>Quranic Arabic</h2>
        <div class="courses-grid">
          @for (course of arabicCourses; track course.id) {
          <ion-card>
            <img [src]="course.thumbnail" [alt]="course.title" />
            <ion-card-header>
              <ion-badge color="primary">{{ course.level }}</ion-badge>
              <ion-card-title>{{ course.title }}</ion-card-title>
              <p class="instructor">By {{ course.instructor }}</p>
            </ion-card-header>
            <ion-card-content>
              <p>{{ course.description }}</p>
              <div class="course-meta">
                <ion-chip>
                  <ion-label>{{ course.duration }}</ion-label>
                </ion-chip>
                <p class="price">₦{{ course.price.toLocaleString() }}</p>
              </div>
              <ion-button expand="block" (click)="addToCart(course)">
                Enroll Now
                <ion-icon name="cart" slot="end"></ion-icon>
              </ion-button>
            </ion-card-content>
          </ion-card>
          }
        </div>
      </div>

      <div class="category-section">
        <h2>Computer Skills</h2>
        <div class="courses-grid">
          @for (course of computerCourses; track course.id) {
          <ion-card>
            <img [src]="course.thumbnail" [alt]="course.title" />
            <ion-card-header>
              <ion-badge color="primary">{{ course.level }}</ion-badge>
              <ion-card-title>{{ course.title }}</ion-card-title>
              <p class="instructor">By {{ course.instructor }}</p>
            </ion-card-header>
            <ion-card-content>
              <p>{{ course.description }}</p>
              <div class="course-meta">
                <ion-chip>
                  <ion-label>{{ course.duration }}</ion-label>
                </ion-chip>
                <p class="price">₦{{ course.price.toLocaleString() }}</p>
              </div>
              <ion-button expand="block" (click)="addToCart(course)">
                Enroll Now
                <ion-icon name="cart" slot="end"></ion-icon>
              </ion-button>
            </ion-card-content>
          </ion-card>
          }
        </div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .courses-grid {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      .category-section {
        margin-bottom: 2rem;
      }

      .category-section h2 {
        color: var(--ion-color-primary);
        margin: 1rem 0;
      }

      ion-card {
        margin: 0;
      }

      ion-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .instructor {
        color: var(--ion-color-medium);
        margin: 0.5rem 0;
        font-size: 0.9rem;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
      }

      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--ion-color-primary);
        margin: 0;
      }

      ion-badge {
        margin-bottom: 0.5rem;
        text-transform: capitalize;
      }

      ion-chip {
        --background: var(--ion-color-light);
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonChip,
    IonLabel,
    IonMenuButton,
    IonButtons,
  ],
})
export class CoursesComponent {
  arabicCourses: Course[] = [
    {
      id: 'arabic-101',
      title: 'Quranic Arabic Fundamentals',
      description:
        'Master the basics of Arabic grammar and vocabulary for understanding the Quran.',
      price: 25000,
      instructor: 'Sheikh Abdullah',
      category: 'quranic-arabic',
      level: 'beginner',
      skoolUrl: 'https://skool.com/arabic-101',
      thumbnail: 'assets/images/arabic-course.jpg',
      startDate: Timestamp.fromDate(new Date('2024-04-01')),
      duration: '12 weeks',
    },
    {
      id: 'arabic-201',
      title: 'Intermediate Quranic Arabic',
      description:
        'Deepen your understanding of Arabic grammar and Quranic vocabulary.',
      price: 35000,
      instructor: 'Sheikh Abdullah',
      category: 'quranic-arabic',
      level: 'intermediate',
      skoolUrl: 'https://skool.com/arabic-201',
      thumbnail: 'assets/images/arabic-course-2.jpg',
      startDate: Timestamp.fromDate(new Date('2024-04-15')),
      duration: '16 weeks',
    },
  ];

  computerCourses: Course[] = [
    {
      id: 'web-dev-101',
      title: 'Web Development Fundamentals',
      description:
        'Learn the basics of HTML, CSS, and JavaScript for modern web development.',
      price: 45000,
      instructor: 'Abdullah Mohammed',
      category: 'computer-skills',
      level: 'beginner',
      skoolUrl: 'https://skool.com/web-dev-101',
      thumbnail: 'assets/images/webdev-course.jpg',
      startDate: Timestamp.fromDate(new Date('2024-04-01')),
      duration: '8 weeks',
    },
    {
      id: 'fullstack-angular',
      title: 'Full Stack Development with Angular',
      description:
        'Master full stack development using Angular, Node.js, and Firebase.',
      price: 75000,
      instructor: 'Abdullah Mohammed',
      category: 'computer-skills',
      level: 'advanced',
      skoolUrl: 'https://skool.com/fullstack-angular',
      thumbnail: 'assets/images/angular-course.jpg',
      startDate: Timestamp.fromDate(new Date('2024-05-01')),
      duration: '16 weeks',
    },
  ];

  constructor(private cartService: CartService) {}

  addToCart(course: Course) {
    this.cartService.addToCart({
      productId: course.id,
      productType: 'course',
      quantity: 1,
      price: course.price,
    });
  }
}

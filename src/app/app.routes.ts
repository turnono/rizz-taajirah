import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./features/books/books.component').then((m) => m.BooksComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./features/store/store.component').then((m) => m.StoreComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services.component').then(
        (m) => m.ServicesComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/account/account.component').then(
        (m) => m.AccountComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

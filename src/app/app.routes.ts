import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/legal/terms.component').then(
        (m) => m.TermsComponent
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/legal/privacy.component').then(
        (m) => m.PrivacyComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

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
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/legal/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/legal/terms.component').then((m) => m.TermsComponent),
  },
  {
    path: 'mcp',
    loadComponent: () =>
      import('./features/mcp/mcp.component').then((m) => m.McpComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

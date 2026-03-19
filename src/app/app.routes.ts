import { Routes } from '@angular/router';
import { authGuard } from './features/portal/guards/auth.guard';


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
    path: 'hadiya/vendors',
    loadComponent: () =>
      import('./features/hadiya/vendor-onboarding.component').then((m) => m.VendorOnboardingComponent),
  },
  {
    path: 'mcp',
    loadComponent: () =>
      import('./features/mcp/mcp.component').then((m) => m.McpComponent),
  },
  {
    path: 'supply',
    redirectTo: 'archive',
  },
  {
    path: 'mobility',
    redirectTo: 'archive',
  },

  {
    path: 'portal/login',
    loadComponent: () =>
      import('./features/portal/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'portal',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/portal/portal-dashboard/portal-dashboard.component').then((m) => m.PortalDashboardComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./features/archive/archive.component').then((m) => m.ArchiveComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];


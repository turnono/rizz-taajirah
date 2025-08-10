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
    path: 'mcp',
    loadComponent: () =>
      import('./features/mcp/mcp.component').then((m) => m.McpComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

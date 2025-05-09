import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailCollectionService } from '../services/email-collection.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private emailService: EmailCollectionService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Check if user is logged in using EmailCollectionService
    const isLoggedIn = this.emailService.isLoggedIn();

    return of(isLoggedIn).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // User is logged in, allow access
          return true;
        }
        // Not logged in, redirect to landing page to create anonymous user
        return this.router.createUrlTree(['/']);
      })
    );
  }
}

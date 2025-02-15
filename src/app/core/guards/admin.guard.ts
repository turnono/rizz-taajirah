import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return authState(this.auth).pipe(
      switchMap(async (user) => {
        if (!user) {
          return this.router.createUrlTree(['/auth/login']);
        }

        const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
        const userData = userDoc.data() as User;

        if (userData?.role === 'admin') {
          return true;
        }

        return this.router.createUrlTree(['/']);
      })
    );
  }
}

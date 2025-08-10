import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { arrowDownOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

// Register Ionicons
addIcons({
  'arrow-down-outline': arrowDownOutline,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBOEwSrq5bNlPqEpysEy8dedSYV9HrI4ek',
        authDomain: 'taajirah.firebaseapp.com',
        databaseURL:
          'https://taajirah-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'taajirah',
        storageBucket: 'taajirah.appspot.com',
        messagingSenderId: '855515190257',
        appId: '1:855515190257:web:2c01b97a96acc83556ea50',
        measurementId: 'G-SP3FWBJNT3',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
  ],
};

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ projectId: "ajudateconta", appId: "1:805137696998:web:6cd747fd681ee570e71327", storageBucket: "ajudateconta.firebasestorage.app", apiKey: "AIzaSyBw9f4MVJrKhvZQod5aoYt5PIeVpDsNRo4", authDomain: "ajudateconta.firebaseapp.com", messagingSenderId: "805137696998" })), 
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    provideAnimationsAsync(), importProvidersFrom(CommonModule), 
    importProvidersFrom(BrowserAnimationsModule),]
};

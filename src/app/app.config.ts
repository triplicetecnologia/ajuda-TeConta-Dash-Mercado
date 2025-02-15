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
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage, getStorage } from '@angular/fire/storage'; 
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ projectId: "ajudateconta", appId: "1:805137696998:web:6cd747fd681ee570e71327", storageBucket: "ajudateconta.firebasestorage.app", apiKey: "AIzaSyBw9f4MVJrKhvZQod5aoYt5PIeVpDsNRo4", authDomain: "ajudateconta.firebaseapp.com", messagingSenderId: "805137696998" })), 
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    provideAnimationsAsync(), importProvidersFrom(CommonModule), 
    importProvidersFrom(BrowserAnimationsModule),importProvidersFrom(ReactiveFormsModule),
    provideStorage(() => getStorage()), provideNgxMask(),provideHttpClient(),
    importProvidersFrom(MatSnackBarModule), importProvidersFrom(MatDialogModule), importProvidersFrom(FormsModule),
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' } ]// Define o formato da data como Brasil]
};

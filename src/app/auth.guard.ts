import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      take(1), // Escuta apenas uma vez para evitar loops
      map((user) => {
        if (user) {
          // if (this.router.url === '/login') {
          //   this.router.navigate(['/inicio']); // Redireciona apenas se estiver na tela de login
          // }
          return true; // Permite o acesso
        } else {
          if (this.router.url !== '/login') {
            this.router.navigate(['/login']); // Redireciona apenas se não estiver na tela de login
          }
          return false; // Bloqueia o acesso
        }
      })
    );
  }
}

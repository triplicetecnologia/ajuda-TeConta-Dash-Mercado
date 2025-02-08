import { Component } from '@angular/core';
import { AuthService } from '../../../src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.senha).then(() => {
      // Redirecionar para Dashboard
    }).catch(error => {
      console.error(error);
    });
  }
}

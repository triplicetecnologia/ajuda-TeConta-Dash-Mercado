import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NotificaoServiceService } from '../services/notificao-service.service';
import { DialogAnuncioComponent } from '../dialog-anuncio/dialog-anuncio.component';
@Component({
  selector: 'app-login',
  imports: [MatGridListModule, MatCardModule, MatIconModule, MatInputModule,
    MatRadioModule, 
    MatSelectModule,
    MatButtonModule, 
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;

  email: string = '';
  password: string = '';
  constructor(private router: Router, private authService: AuthService, private notificadao: NotificaoServiceService){

  }
  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.notificadao.mostrarMensagemSucesso("Sucesso ao logar")
        this.router.navigate(['/inicio']); // Redireciona se já estiver logado
      }
    });
  }

  getAssetUrl(img: string) {
    return `assets/${img}`;
  }


  cadastrar(){
    this.router.navigate(['cadastrar']);

  }

  logout(): void {
    this.authService.logout().then(() => {
      console.log('Usuário deslogado');
    });
  }

  login() {
    this.authService.login(this.email, this.password)
      .then((user) => {
        if (user) {
          console.log('Usuário logado:', user);
          this.router.navigate(['/inicio']);
        }
      })
      .catch((error) => {
        // this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
        console.error('Erro de login:', error);
      });
  }

 
}

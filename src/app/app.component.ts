import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './services/auth.service';
import { NotificaoServiceService } from './services/notificao-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'dashboard-ajuda-teconta';
  sidenavOpened = false;
  mostraMenu = false;

    constructor(private router: Router, private authService: AuthService, private notificadao: NotificaoServiceService){}
    ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(status => {
        this.mostraMenu = status;
      });
    }
    toggleSidenav() {
      this.sidenavOpened = !this.sidenavOpened;
    } 

  paginaLoja(){
    this.router.navigate(['/loja']);
    this.toggleSidenav();
  }
  paginaInicio(){
    this.router.navigate(['/inicio']);
    this.toggleSidenav();
  }
  paginaProdutos(){
    this.router.navigate(['/produtos']);
    this.toggleSidenav();
  }

  logout(){
    this.authService.logout().then(() => {
      this.notificadao.mostrarMensagem('Usuário deslogado com sucesso!');
      this.router.navigate(['/login']);
    });
  }
}

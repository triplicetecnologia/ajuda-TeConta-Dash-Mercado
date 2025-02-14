import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificaoServiceService } from '../services/notificao-service.service';


@Component({
  selector: 'app-inicio',
  imports: [MatSidenavModule, MatIconModule,
     MatButtonModule, MatToolbarModule, 
     MatListModule, MatCardModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class InicioComponent {
  showFiller = false;
  sidenavOpened = false;

  constructor(private router: Router, private authService: AuthService, private notificadao: NotificaoServiceService){
    
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  } 


  logout(){
    this.authService.logout().then(() => {
      console.log('Usuário deslogado');
      this.notificadao.mostrarMensagem('Usuário deslogado com sucesso!');
      this.router.navigate(['/login']);
    });
  }

  paginaLoja(){
    this.router.navigate(['/loja']);
  }
}

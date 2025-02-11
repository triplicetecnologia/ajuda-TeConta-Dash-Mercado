import { Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cadastrar', component: CadastrarUsuarioComponent },
  { path: 'login', component:  CadastrarUsuarioComponent},

];

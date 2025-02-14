import { Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LojaComponent } from './loja/loja.component';
import { ProdutosComponent } from './produtos/produtos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cadastrar', component: CadastrarUsuarioComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'inicio', component:  InicioComponent , canActivate: [AuthGuard]},
  { path: 'loja', component:  LojaComponent , canActivate: [AuthGuard]},
  { path: 'produtos', component:  ProdutosComponent , canActivate: [AuthGuard]},
  // { path: 'inicio', component:  InicioComponent},
];

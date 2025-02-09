import { Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastrar', pathMatch: 'full' },
  { path: 'cadastrar', component: CadastrarUsuarioComponent },
  { path: 'login', component:  InicioComponent},

];

import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';

import { AutorizadoGuard } from './_guard/autorizado.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';

/**
 * 1º Route - Quando se tenta acessar nada ocorre o redirecionamento pra home
 * 2ª Route - Redirecionamento para home
 * 3ª Route - Redirecionamento para login
 * 4ª Route - Redirecionamento para rota privada
 * 5ª Route - Momento que a pessoa escreve qualquer coisa e por padrão vai ser
 * redirecionado para a home novamente
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  /**
   * É dessa forma que um Guard é passado para uma rota,
   * e pode ser passado mais de um Guard por rota, por isso que está como Array.
   */
  {
    path: 'privado',
    component: PrivadoComponent,
    canActivate: [AutorizadoGuard]
  },
  {
    path: '***',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

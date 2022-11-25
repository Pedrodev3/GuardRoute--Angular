import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AutorizacaoService } from './../shared/services/autorizacao.service';

@Injectable({
  providedIn: 'root',
})
export class AutorizadoGuard implements CanActivate {
  constructor(
    private autorizacaoService: AutorizacaoService,
    private routerService: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    /**
     * Promise criada para que a requisição recebida seja um boolean e o que será retornado para o usuário
     * seja o corpo(res), que no caso está sendo um setTimeOut com um método de redirecionamento para a
     * página "Login" com 3 segundos de delay.
     */
    const demorar: Promise<boolean> = new Promise<boolean>((res) => {
      setTimeout(() => {
        this.routerService.navigate(['/login']);
      }, 3000);
    });


    /**
     * Variável e condicional definidas para controlar o funcionamento da rota através do status do Login, status esse
     * que é obtido através do AutorizacaoService.
     *
     * @if Caso a variável "usuarioEstaLogado" passe na validação será retornado "true" para que o guard permita o funcionamento da rota.
     *
     * @elseIf Caso a variável não passe será retornado a Promise "demorar" que tem um valor de boolean e irá ocorrer
     * tudo que foi explicado logo acima na função.
     */
    const usuarioEstaLogado = this.autorizacaoService.obterLoginStatus();
    if (usuarioEstaLogado) {
      setTimeout(() => {
        return true;
      }, 1000);
    } else if (!usuarioEstaLogado) {
      alert('Você precisa realizar o login inicialmente'); // Apenas uma gracinha para deixar mais "legal"
      return demorar;
    }

    // Apenas pela necessidade de um retorno com boolean.
    return true;
  }
}

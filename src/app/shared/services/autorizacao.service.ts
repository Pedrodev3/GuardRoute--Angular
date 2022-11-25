import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizado = false;

  constructor() { }

  autorizar() {
    localStorage.setItem('login', 'sim');
  }

  deslogar() {
    localStorage.clear();
  }

  /**
   *
   * @returns !! -> Transforma o retorno em um boolean
   * Caso possua o que procura será retornado "true",
   * caso não possua será retornado "false".
   *
   * Obs.: Está sendo trabalhado com Arrow Function
   */
  obterLoginStatus = () => !!localStorage.getItem('login');

}

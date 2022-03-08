import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject } from 'rxjs';
import {Subscription} from 'rxjs';
import { ConfirmacionDTO } from '../models/ConfirmacionDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  private host ="http://192.168.0.105:8083";
  private POST_CONSULTAR_USUARIO="/api/es/configuracion/usuario/v1/{usernarme}/{pass}";

  readonly IS_USER_LOGGED ='isLogeado';
  public urlAcceso = '';

  public statusLogginSubject = new Subject<boolean>();
  public changeLoginStatus = this.statusLogginSubject.asObservable();

  private confirmacion:ConfirmacionDTO | undefined;

  logear(){
      console.log('METODO LOGEAR')
      localStorage.setItem(this.IS_USER_LOGGED,'true');
      this.statusLogginSubject.next(true);
      return true;
  }

  deslogear(){
    localStorage.removeItem(this.IS_USER_LOGGED);
    this.statusLogginSubject.next(false);
  }

  isLogeado(url: string){
    const isLogged = localStorage.getItem(this.IS_USER_LOGGED);
    if(!isLogged){
      this.urlAcceso = url;
      return false;
    }
    return true;
  }

  consultarUsuario(usuario:string,password:string): Observable<ConfirmacionDTO>{
    return this.http.post<ConfirmacionDTO>(this.host.concat(this.POST_CONSULTAR_USUARIO.replace('{usernarme}',usuario).replace('{pass}',password)),null);
  }
}

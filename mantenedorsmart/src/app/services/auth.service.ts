import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  readonly IS_USER_LOGGED ='isLogeado';
  public urlAcceso = '';

  public statusLogginSubject = new Subject<boolean>();
  public changeLoginStatus = this.statusLogginSubject.asObservable();

  logear(usuario :string ,password:string ):boolean{
    console.log('METODO LOGEAR')
    if(usuario == 'carlos' && password == 'carlos'){
      localStorage.setItem(this.IS_USER_LOGGED,'true');
      this.statusLogginSubject.next(true);
      return true;
    }
    return false;
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
}

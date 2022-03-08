import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoType } from '../models/periodo';
import { AnioContableType } from '../models/anioContable';



@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private host ="http://192.168.0.105:8083";
  private GET_CONSULTAR_TODOS_LOS_PERIODOS = "/api/es/configuracion/periodo/v1";
  private GET_CONSULTAR_ANIO_CONTABLE ="/api/es/configuracion/aniocontable/v1";
  private PUT_MODIFICAR_PERIODO_CONTABLE ="/api/es/configuracion/periodo/v1";
  private PUT_MODIFICAR_ANIO_CONTABLE ="/api/es/configuracion/aniocontable/v1";
  private POST_CONSULTAR_USUARIO="/api/es/configuracion/usuario/v1/{usernarme}/{pass}";

  constructor(private http :HttpClient) {
    console.log('SERVICIO UP.!');
  }

  // CONSUMO DEL SERVICIO CONFIGURADOR SMARTERPES CAPACIDAD DE CONSULTAR TODOS LOS PERIODOS
  obtenerTodosLosPeriodosDisponibles(): Observable<PeriodoType[]>{
    return this.http.get<PeriodoType[]>(this.host.concat(this.GET_CONSULTAR_TODOS_LOS_PERIODOS));
  }

  obtenerTodosLosAniosContables(): Observable<AnioContableType[]> {
    return this.http.get<AnioContableType[]>(this.host.concat(this.GET_CONSULTAR_ANIO_CONTABLE));
  }

  modificarPeriodo(requestPeriodo :PeriodoType):Observable<any> {
    return this.http.put(this.host.concat(this.PUT_MODIFICAR_PERIODO_CONTABLE),requestPeriodo);
  }

  modificarAnioContable(requestAnioContable :AnioContableType):Observable<any>{
    return this.http.put(this.host.concat(this.PUT_MODIFICAR_ANIO_CONTABLE),requestAnioContable);
  }

  consultarUsuario(user:string, pass:string){
    return this.http.post(this.POST_CONSULTAR_USUARIO.replace('{usernarme}',user).replace('{pass}',pass),null);
  }
}

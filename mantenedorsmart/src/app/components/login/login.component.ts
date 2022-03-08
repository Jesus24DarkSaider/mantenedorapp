import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PeriodoService } from 'src/app/services/periodo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  isLoading = false;
  rutaRedireccionar = '';

  constructor(private fb :FormBuilder,private _snackBar: MatSnackBar, private router : Router, private Auth : AuthService, private consumoService :PeriodoService ) { 
    this.form = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  validarUsuario(){
    const usuario = this.form.value.usuario ;
    const password = this.form.value.password;
    console.log(usuario);
    console.log(password);
    this.Auth.consultarUsuario(usuario,password).subscribe(respuesta => {
        console.log(respuesta);
        if (respuesta.autenticado === true){
          this.Auth.logear();
          this.lanzarExepcion(0);
          this.cargarSpinner();
        }else{
          this.lanzarExepcion(1);
        }
    })
  }

  cargarSpinner(){
    this.isLoading = true;
    setTimeout(() => {
      this.rutaRedireccionar = this.Auth.urlAcceso;
      this.Auth.urlAcceso = '';
      this.router.navigate(['dashboard']);
    }, 2000);
  }

  lanzarExepcion(codigo:number){
    this._snackBar.open(this.obtenermensajeAlerta(codigo),this.obtenermensajeIcono(codigo),{
     duration:1000,
      horizontalPosition: 'center',
      verticalPosition:'bottom',
      panelClass: 'alertcolor'
    })
  }

  obtenermensajeAlerta(codigo:number):string{
   let mensaje :string ;
   mensaje = "";
    if (codigo == 1){
      mensaje ="Usuario / Password Invalida";
    }
    if (codigo == 2){
      mensaje = "Solicitud Invalida, lamentamos inconvenientes"
    }
    if (codigo == 0){
      mensaje = "Autenticación Exitosa";
    }
    return mensaje;
  }

  obtenermensajeIcono(codigo:number):string{
    let mensaje :string ;
    mensaje = "";
     if (codigo == 1){
       mensaje ="❌";
     }
     if (codigo == 2){
       mensaje = "😥"
     }
     if (codigo == 0){
       mensaje = "✅";
     }
     return mensaje;
   }

}

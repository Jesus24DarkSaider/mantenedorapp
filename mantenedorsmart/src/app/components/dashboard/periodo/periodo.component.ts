import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AnioContableType } from 'src/app/models/anioContable';
import { PeriodoType } from 'src/app/models/periodo';
import { PeriodoService } from 'src/app/services/periodo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  LISTADO_PERIODOS: PeriodoType[] = [];
  COLUMNAS_PERIODOS: string[] = ['numeroPeriodo', 'nombrePeriodo','anioId', 'anioFiscal', 'fechaInicioProceso','fechaFinalProceso','isActivo'];
  dataSourcePeriodos = new MatTableDataSource(this.LISTADO_PERIODOS);

  LISTADO_ANIO_CONTABLE: AnioContableType[] = [];
  COLUMNAS_ANIO_CONTABLE: string [] = ['anioFiscal','activo'];
  dataSourceAnioContable = new MatTableDataSource(this.LISTADO_ANIO_CONTABLE);



  @ViewChild(MatPaginator) paginator! :MatPaginator;
  @ViewChild(MatPaginator) paginatorAnioContable! :MatPaginator;

  ngAfterViewInit() {
    this.dataSourcePeriodos.paginator = this.paginator;
    this.dataSourceAnioContable.paginator = this.paginatorAnioContable;
  }

  // EVENTO FILTRO QUE SIRVE PARA UN FILTRO EN LA TABLA DE PERIODOS
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePeriodos.filter = filterValue.trim().toLowerCase();
  }

  // EVENTO QUE ACTIVA O DESACTIVA EL PERIODO PARA SU PROCESAMIENTO
  onCheckPeriodo(event :any,request :PeriodoType){
    request.isActivo = event.checked;
    console.log(request);
    this.periodoService.modificarPeriodo(request).subscribe(response => {
      if(request.isActivo == true){
        this.mostrarMensajeUsuario(`El Periodo: ${request.nombrePeriodo} - ${request.anioFiscal} sera tomado en cuenta en el siguiente proceso`,0);
      }else{
        this.mostrarMensajeUsuario(`El Periodo: ${request.nombrePeriodo} - ${request.anioFiscal} no sera tomado en cuenta en el siguiente proceso`,1);
      }
      console.log(response)
    })
  }

  // EVENTO QUE ACTIVA O DESACTIVA EL ANIO CONTABLE PARA SU PROCESAMIENTO
  onCheckAnioContable (event :any, request:AnioContableType){
    request.activo= event.checked;
    this.periodoService.modificarAnioContable(request).subscribe(response => {
      if(request.activo == true){
        this.mostrarMensajeUsuario(`El Año Contable: ${request.anioFiscal} y sus Periodos correspondientes seran procesados`,0);
      }else{
        this.mostrarMensajeUsuario(`El Año Contable: ${request.anioFiscal}  y sus Periodos no seran procesados`,1);
      }
      console.log(response);
      this.cargarPeriodosDisponibles();
    });
  }

  constructor(private periodoService :PeriodoService, private _snackBar: MatSnackBar) {}
  // METODO QUE CARGA LOS PERIODOS DISPONIBLES HACIENDO UNA PETICION AL SERVICIO REST
  cargarPeriodosDisponibles(){
    this.periodoService.obtenerTodosLosPeriodosDisponibles().subscribe(RESPONSE_LISTADO_PERIODOS => {
      this.LISTADO_PERIODOS = [];
      if(RESPONSE_LISTADO_PERIODOS != undefined){
        this.LISTADO_PERIODOS = RESPONSE_LISTADO_PERIODOS;
        console.log(RESPONSE_LISTADO_PERIODOS)
        this.dataSourcePeriodos= new MatTableDataSource(this.LISTADO_PERIODOS);
        this.dataSourcePeriodos.paginator = this.paginator;
      }
    });
  }

  // METODO QUE CARGA LOS ANIOS CONTABLES DISPONIBLES HACIENTO UNA PETICION AL SERVICIO REST
  cargarAniosDisponibles(){
    this.periodoService.obtenerTodosLosAniosContables().subscribe(RESPONSE_LISTADO_ANIOSCONTABLES =>{
      this.LISTADO_ANIO_CONTABLE = [];
      this.LISTADO_ANIO_CONTABLE = RESPONSE_LISTADO_ANIOSCONTABLES;
      console.log(RESPONSE_LISTADO_ANIOSCONTABLES)
      this.dataSourceAnioContable = new MatTableDataSource(this.LISTADO_ANIO_CONTABLE);
      this.dataSourceAnioContable.paginator = this.paginatorAnioContable;
    });
  }

  ngOnInit(): void {
   // POBLAMOS LOS DATASOURCE A PARTIR DE LOS METODOS DE CONSULTA REST
   this.cargarPeriodosDisponibles();
   this.cargarAniosDisponibles();
  }

  mostrarMensajeUsuario(mensaje: string,codigo :number){
    this._snackBar.open(mensaje,this.obtenermensajeIcono(codigo),{
      duration:2000,
       horizontalPosition: 'center',
       verticalPosition:'bottom',
       panelClass: 'alertcolor'
     })
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

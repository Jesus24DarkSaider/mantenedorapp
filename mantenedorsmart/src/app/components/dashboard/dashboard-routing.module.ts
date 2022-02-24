import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PeriodoComponent } from './periodo/periodo.component';

const routes: Routes = [
  {path:'',component : DashboardComponent, children:[
    {path:'',component: PeriodoComponent},
    {path: 'periodo', component: PeriodoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
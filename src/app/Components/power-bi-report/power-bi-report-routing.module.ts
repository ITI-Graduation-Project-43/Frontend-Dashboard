import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerBiReportComponent } from './power-bi-report.component';

const routes: Routes = [
  {path:'', component:PowerBiReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerBiReportRoutingModule { }

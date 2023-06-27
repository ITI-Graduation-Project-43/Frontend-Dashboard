import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerBiReportRoutingModule } from './power-bi-report-routing.module';
import { PowerBiReportComponent } from './power-bi-report.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';


@NgModule({
  declarations: [
    PowerBiReportComponent
  ],
  imports: [
    CommonModule,
    PowerBiReportRoutingModule,
    PowerBIEmbedModule 
  ]
})
export class PowerBiReportModule { }

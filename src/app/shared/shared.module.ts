import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHeaderComponent } from './Components/form-header/form-header.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { Loader2Component } from './Components/loader2/loader2.component';



@NgModule({
  declarations: [
    FormHeaderComponent,
    LoaderComponent,
    Loader2Component
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormHeaderComponent,
    LoaderComponent,
    Loader2Component
  ]
})
export class SharedModule { }

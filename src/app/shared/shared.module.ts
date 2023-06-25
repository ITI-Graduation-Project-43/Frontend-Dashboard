import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHeaderComponent } from './Components/form-header/form-header.component';
import { LoaderComponent } from './Components/loader/loader.component';



@NgModule({
  declarations: [
    FormHeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormHeaderComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

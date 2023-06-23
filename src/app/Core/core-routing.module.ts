import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./nav/nav.module').then((m) => m.NavModule), component: NavComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

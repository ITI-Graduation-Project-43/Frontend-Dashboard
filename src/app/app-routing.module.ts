import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HideLoginGuard } from './Guards/hide-login.guard';
import { AuthenticationGuard } from './Guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/Core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [HideLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

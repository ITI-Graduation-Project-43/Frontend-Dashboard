import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationStart,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { LocalStorageService } from '../shared/Services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HideLoginGuard implements CanActivate {
  previousRoute!: string;

  constructor(
    private router: Router,
    private LocalStorageService: LocalStorageService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.LocalStorageService.checkTokenExpiration()) {
      return true;
    } else {
      this.router.navigateByUrl('/bi'); // back to the previous route
      return false;
    }
  }
}

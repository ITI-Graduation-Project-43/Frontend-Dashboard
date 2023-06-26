import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APIService } from 'src/app/shared/Services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  helper: JwtHelperService = new JwtHelperService();
  login!: boolean;
  Id!: string;
  Role!: string;
  User: any;

  constructor(
    private router: Router,
    private http: APIService,
    private NotificationService: NotificationService,
    private LocalStorageService: LocalStorageService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.getUser();
  }

  ngOnInit(): void {
    let obvserverLogin = {
      next: (data: any) => {
        if (data.message == 'login') {
          this.getUser();
          if (this.Role == 'Admin') {
            this.router.navigateByUrl('/dashboard');
          }
        }
        if (
          data.message == 'Your account has been deleted, Goodbye' ||
          data.message == 'Your account has been deactivated, see you soon'
        ) {
          this.signout();
        }
      },
      error: () => {
        this.NotificationService.notify(
          'Something wrong during load the page content'
        );
      },
    };
    this.NotificationService.notifications.subscribe(obvserverLogin);
  }

  checkLogin() {
    this.login = this.LocalStorageService.checkTokenExpiration();
    if (this.login) {
      let user = this.LocalStorageService.decodeToken();
      this.Id = user.Id;
      this.Role = user.Role;
      this.User = user.FullName;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getUser(): void {
    this.checkLogin();
    if (this.login) {
      let obvserver = {
        next: (data: APIResponseVM) => {
          if (data.success) {
            this.LocalStorageService.updateUserInfo(data.items);
          }
        },
        error: (error: Error) => {
          console.log(error.message);
        },
      };
      this.http.getItemById(`${this.Role}`, this.Id).subscribe(obvserver);
    }
  }

  signout() {
    this.login = false;
    this.Id = this.Role = '';
    localStorage.removeItem('MindMission');
    localStorage.removeItem('cart');
    localStorage.removeItem('privacy');
    localStorage.removeItem('creditCard');
    localStorage.removeItem('notifications');
    this.router.navigateByUrl('/login');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  userName: string;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.authService.getIsAuth()) {
      this.userName = this.authService.getUser().firstName;
    }
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}

// }
// userIsAuthenticated = false;
// private authListenerSubs: Subscription;
// this.authListenerSubs = this.authService
//     .getAuthStatusListener()
//     .subscribe((isAuthenticated) => {
//       this.userIsAuthenticated = isAuthenticated;
//     });
// ngOnDestroy() {
//   this.authListenerSubs.unsubscribe();
// }

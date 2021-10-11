import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  message = 'status: N/A';
  userName: string = '';
  userPassword: string = '';

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.message = 'status: logged in';
    }
  }

  // onSubmit() {
  //   // some stuff
  //   this.router.navigate(['/todos']);
  // }

  login() {
    this.authService
      .login(this.userName, this.userPassword)
      .subscribe((res) => {
        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl
            ? this.router.parseUrl(this.authService.redirectUrl)
            : 'login';
          this.message = 'status: logged in';
          console.log(redirect);
          this.router.navigateByUrl(redirect);
        }
      });
  }

  logout() {
    this.authService.logout();
    this.message = 'status: logged out';
  }
}

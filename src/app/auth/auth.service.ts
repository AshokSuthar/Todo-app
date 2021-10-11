import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string = '';

  users: User[] = [
    {
      name: 'Uma',
      password: 'Ashu',
    },
  ];

  login(userName: String, userPassword: String): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap((val) => {
        this.redirectUrl = 'todos';
        const userFound = this.users.find(
          (user) => user.name === userName && user.password === userPassword
        );
        if (!userFound) {
          return alert('Invalid UserName and password');
        }
        // using userState as a flag to see if user is loggedIn or not.
        localStorage.setItem('userState', JSON.stringify({ isLoggedIn: true }));
        this.isLoggedIn = true;
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap((val) => {
        this.redirectUrl = 'login';
        localStorage.removeItem('userState');
        this.isLoggedIn = false;
      })
    );
  }
}

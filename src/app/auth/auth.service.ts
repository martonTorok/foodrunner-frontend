import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const url = 'http://localhost:3000/user/register';
    return this.http.post<{ token: string }>(url, { email, password });
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>('http://localhost:3000/user/login', { email, password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem('access_token') !== null)
  }

  logoutUser() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}

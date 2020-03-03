import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api';
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( private http: HttpClient ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  authenticate({email, password}) {
   return this.http.post(this.baseUrl + '/auth/login', {email, password});
  }

  register({email, password, phone, name}) {
    return this.http.post(this.baseUrl + '/auth/register', {email, password, phone, name});
  }

  refreshToken(token) {
    return this.http.get(this.baseUrl + '/auth');
  }

  logout(): Observable<any> {
    localStorage.removeItem('TOKEN');
    this._authenticated.next(false);
    return of('ok');
  }
}

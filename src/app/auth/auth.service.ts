import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthState } from './auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _authState = new BehaviorSubject<AuthState>(this.getAuthStateData());

  constructor(private httpClient: HttpClient) {}

  getAuthStateData(): AuthState {
    const tokenInJSON = localStorage.getItem('NG@Auth:token');
    const userInJSON = localStorage.getItem('NG@Auth:user');

    const token = tokenInJSON ? JSON.parse(tokenInJSON) : "";
    const user  = userInJSON  ? JSON.parse(userInJSON)  : null;

    return { token, user };
  }

  get authState(): AuthState {
    return this._authState.value;
  }

  set authState(authState: AuthState) {
    const tokenInJSON = JSON.stringify(authState.token);
    const userInJSON = JSON.stringify(authState.user);

    localStorage.setItem('NG@Auth:token', tokenInJSON);
    localStorage.setItem('NG@Auth:user', userInJSON);

    this._authState.next(authState);
  }

  signIn(login: string, password: string): Observable<AuthState> {
    const url = `${environment._api}/login`;
    return this.httpClient.post<AuthState>(url, { login, password });
  }

  signOut(): void {
    this.authState = { user: null, token: "" }
  }
}

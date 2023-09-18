import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, TokenType } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = 'https://fakestoreapi.com/auth/login';
  constructor(private http: HttpClient) {}

  public login(user: Auth): Observable<TokenType> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(user);
    return this.http.post<TokenType>(this.baseURL, body, { headers });
  }
}

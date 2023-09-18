import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth, FormNameType, TokenType } from './interfaces/auth';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  token: TokenType = '';
  isSubmit: boolean = false;
  user: Auth;
  valid: { username: boolean; password: boolean };

  constructor(private authService: AuthService) {
    this.user = {
      username: '',
      password: '',
    };
    this.valid = {
      username: false,
      password: false,
    };
  }

  login() {
    this.isSubmit = true;

    if (!this.valid.username || !this.valid.password) {
      this.isSubmit = false;
      return;
    }

    this.authService
      .login(this.user)
      .pipe(catchError(this.handleError))
      .subscribe(
        (resp: TokenType) => {
          this.isSubmit = false;
          this.token = resp;
          console.log(resp);
        },
        () => {
          this.isSubmit = false;
        }
      );
  }

  public validateInput(val: string, type: FormNameType) {
    if (type == 'username') {
      if (val.length > 1) this.valid.username = true;
      else this.valid.username = false;
    } else if (type == 'password') {
      if (val.length > 1) this.valid.password = true;
      else this.valid.password = false;
    }
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

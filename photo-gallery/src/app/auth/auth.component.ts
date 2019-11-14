import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthCookie } from '../auth-cookies-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  login: string = "";
  password: string = "";

  constructor(private router: Router, private httpClient: HttpClient, private _authCookie: AuthCookie) { }

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  ngOnInit() {
    if (this._authCookie.getAuth()) {
      this.router.navigate(["/"]);
    }
  }

  buttonLoginClick() {
    this.httpClient.post(`http://localhost:3001/login`, {
      login: this.login,
      password: this.password
    }, this.options).subscribe((result: any) => {
      if (!result) return;
      this._authCookie.setAuth(result.token);
      this.router.navigate(["/"]);
    });
  }

}

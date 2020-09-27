import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
    this.loggedIn();
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.doLogin();
    } else {
      alert('validation error');
    }
  }

  doLogin() {
    let res = this.http.login(this.loginForm.value);
    if (res.status) {
      this.auth.setLoggedIn(true);
      this.auth.setUserdata(res.info);
      this.loggedIn();
    } else {
      alert(res.msg);
    }
  }

  loggedIn() {
    this.auth.isLoggedin$.subscribe((loggedin) => {
      if (loggedin) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}

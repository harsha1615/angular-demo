import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.doRegister();
    } else {
      alert('validation error');
    }
  }

  doRegister() {
    let res = this.http.register(this.registerForm.value);
    if (res.status) {
      this.router.navigate(['login']);
    } else {
      alert(res.msg);
    }
  }
}

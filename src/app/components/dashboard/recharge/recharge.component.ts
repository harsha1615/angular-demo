import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  rechargeForm: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.rechargeForm = this.fb.group({
      mobile: ['', Validators.required],
      network: ['', Validators.required],
      region: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  recharge() {
    if (this.rechargeForm.valid) {
      this.auth.rechargeDone();
      alert('recharge done');
    } else {
      alert('validation error');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  uname:string;
  recharges:number;

  constructor(private auth:AuthService) {}

  ngOnInit(): void {
    this.auth.userdata$.subscribe((data)=>{
      this.uname = data.name;
      this.recharges = data.recharges;
    });
  }

}

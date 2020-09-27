import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(){
    this.auth.isLoggedin$.subscribe((status) => {
      this.loggedIn = status;
    })
  }

  logout(){
    this.auth.setLoggedIn(false);
    this.router.navigate(['login']);
  }

}

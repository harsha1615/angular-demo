import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService, userData } from './http.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  isLoggedin$: Observable<boolean>;
  private _isLoggedIn: BehaviorSubject<boolean>;

  userdata$: Observable<userData>;
  private _userdata: BehaviorSubject<userData>;

  constructor(private router:Router, private httpService:HttpService) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isLoggedin$ = this._isLoggedIn.asObservable();
    this._userdata = new BehaviorSubject<userData>(null);
    this.userdata$ = this._userdata.asObservable();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var loggedin:boolean = this._isLoggedIn.getValue();
    if(loggedin){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  setLoggedIn(status: boolean) {
    this._isLoggedIn.next(status);
  }

  setUserdata(udata:userData){
    this._userdata.next(udata);
  }

  rechargeDone(){
    let udata:userData = this._userdata.getValue();
    if(this.httpService.rechargeDone(udata.email)){
      udata.recharges += 1;
      this._userdata.next(udata);
    }
  }

}

import { Injectable } from '@angular/core';

export interface userData{
  name:string;
  email:string;
  password:string;
  recharges:number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  users:Array<userData> = [];

  constructor() { }

  login(form){
    let uid = this.getUser(form.email);
    if(uid==-1){
      return {
        status:false,
        msg:"no user found"
      }
    }
    if(this.users[uid].password != form.password){
      return {
        status:false,
        msg:"Incorrect Password"
      }
    }
    return {
      status:true,
      info:{...this.users[uid]}
    }
  }

  register(form){
    let uid = this.getUser(form.email);
    if(uid==-1){
      this.users.push({
        name:form.name,
        email:form.email,
        password:form.password,
        recharges:0
      })
      return {
        status:true,
        msg:"register successful"
      }
    }
    return {
      status:false,
      msg:"user already exists"
    }
  }

  private getUser(email):number{
    for(let user of this.users){
      if(user.email == email){
        return this.users.indexOf(user);
      }
    }
    return -1;
  }

  rechargeDone(email):boolean{
    let uid = this.getUser(email);
    if(uid!=-1){
      this.users[uid].recharges += 1;
      return true;
    }
    return false;
  }
  
}

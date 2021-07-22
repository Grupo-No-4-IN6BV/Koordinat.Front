import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {


  public uri: string;
  public token;
  public user;

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

private extractData(res: Response){
  let body = res;
  return body || [] || {};
}

getToken(){
  let token = localStorage.getItem('token');
  if(token != null || token != undefined){
    this.token = token;
  }else{
    this.token = null;
  }
  return this.token;
}

getUser(){
  let user = JSON.parse(localStorage.getItem('user'));
  if(user != null || user != undefined){
    this.user = user;
  }else{
    this.user = null;
  }
  return this.user;
}
}



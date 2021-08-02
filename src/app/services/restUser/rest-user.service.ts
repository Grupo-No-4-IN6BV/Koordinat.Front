import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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


wishSet(idUser, idProduct){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  
  return this.http.put(this.uri+idUser+'/'+idProduct+'/wishSet/', {headers: headers})
  .pipe(map(this.extractData))
}

removeWish(idUser, idProduct){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  return this.http.put(this.uri+idUser+'/'+idProduct+'/removeWish', {headers: headers})
  .pipe(map(this.extractData))
}

shopping(idUser, product){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  let params = JSON.stringify(product);
  return this.http.post(this.uri+'shopping/'+idUser, params, {headers: headers})
  .pipe(map(this.extractData))
}

removeItem(idUser, idProduct){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  return this.http.post(this.uri+idUser+'/removeItem/'+idProduct, null, {headers: headers})
  .pipe(map(this.extractData))
}

checkIn(idUser){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  return this.http.post(this.uri+idUser+'/checkIn', null, {headers: headers})
  .pipe(map(this.extractData))
}

deleteUser(idUser, password){
  let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
  })
  return this.http.put(this.uri+'removeUser/'+idUser, {password: password}, {headers: headers})
  .pipe(map(this.extractData))
}

updateUser(idUser){
  let params = JSON.stringify(idUser);
  let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
  })
  return this.http.put(this.uri+'updateUser/'+idUser._id, params, {headers: headers})
  .pipe(map(this.extractData))
}

}


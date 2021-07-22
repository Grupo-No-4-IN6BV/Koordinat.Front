import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from 'src/app/services/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public uri: string;
  public token:any;
  public user: any;
  public userSelect: any;

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }
  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  register(user){
    let params = JSON.stringify(user);
    console.log(params)
    return this.http.post(this.uri + 'registerUser', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  login(user, tokenStatus){
    user.gettoken = tokenStatus;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login', params, this.httpOptions)
    .pipe(map(this.extractData))
  }
  
}

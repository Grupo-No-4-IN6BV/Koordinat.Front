import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestCategoryService {

  public uri: string;
  public token;
  public user;
  public product

  constructor(private restUser: RestUserService, private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

private extractData(res: Response){
  let body = res;
  return body || [] || {};
}
public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

getCategories(){
  return this.http.get(this.uri+'getCategories', this.httpOptions)
  .pipe(map(this.extractData))
}


saveCategory(category){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.restUser.getToken()
  })
  let params = JSON.stringify(category);
  return this.http.put(this.uri+'saveCategory', params,  {headers: headers})
  .pipe(map(this.extractData))
}
}

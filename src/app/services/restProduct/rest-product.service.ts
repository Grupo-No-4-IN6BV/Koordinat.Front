import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestProductService {

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

getProducts(){
  return this.http.get(this.uri+'getProducts', this.httpOptions)
  .pipe(map(this.extractData))
}

getProductsNews(){
  return this.http.get(this.uri+'getProductNews', this.httpOptions)
  .pipe(map(this.extractData))
}

saveCategory(idBussines, product){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.restUser.getToken()
  })
  let params = JSON.stringify(product);
  return this.http.post(this.uri+'saveProduct/'+idBussines, params,  {headers: headers})
  .pipe(map(this.extractData))
}

removeProduct(idProduct){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.restUser.getToken()
  })

  return this.http.put(this.uri+'removeProduct/'+idProduct, null, {headers: headers})
  .pipe(map(this.extractData))
}


getProductsMain(idBussines){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.restUser.getToken()
  })
  return this.http.get(this.uri+'spentProducts/'+idBussines, {headers: headers})
  .pipe(map(this.extractData))
}

getProduct(idProduct){
  return this.http.get(this.uri+'getProduct/'+idProduct, this.httpOptions)
  .pipe(map(this.extractData))
}

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.restUser.getUser();
      if(user && user.role == 'ROLE_ADMIN'){
        return true;
      }else{
        let token = this.restUser.getToken();
        if(user && token.length > 0){
          this.router.navigateByUrl('user');
          return false;
        }else {
          this.router.navigateByUrl('catalogo');
          return false;
        }
      }
    return true;
  }
  constructor(private restUser:RestUserService, private router:Router){}
}
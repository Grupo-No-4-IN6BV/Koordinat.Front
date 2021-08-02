import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { createPopper } from '@popperjs/core';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { MatSidenav } from '@angular/material/sidenav';
import { RegisterBusinessComponent } from 'src/app/auth/register-business/register-business.component';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss']
})
export class NabvarComponent implements OnInit {

  token:string = null;
  user:any;
  uri;
  vrf;
  noti;


  @Input() inputSideNav: MatSidenav;
 
  constructor(private router: Router, private restUser:RestUserService, private  restProduct: RestProductService) { }

  ngOnInit(): void {
this.notification();

  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.change();
  }

  notification(){
    if(this.user == null ){
      this.vrf = null;
    }else{
        if (this.user.role == 'ROLE_BUSINESS'){
          this.restProduct.notification(this.user._id).subscribe((res:any)=>{
            if(res.numberNot){
              this.noti = res.numberNot
            }
          })
      }
  }
  }

  change(){
    if(this.user == null ){
      this.vrf = null;
    }else{
      if (this.user.role == 'ROLE_ADMIN'){
        this.vrf = 1;
      }else if (this.user.role == 'ROLE_USER'){
        this.vrf = 0;
      }else if (this.user.role == 'ROLE_BUSINESS'){
        this.vrf = 2;
      }
    }
  }

  logOut(){
    localStorage.clear();
    this.token = null;
    this.router.navigateByUrl('');
  }


}

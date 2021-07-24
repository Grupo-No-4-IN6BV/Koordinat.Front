import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { createPopper } from '@popperjs/core';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { MatSidenav } from '@angular/material/sidenav';

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


  @Input() inputSideNav: MatSidenav;
 
  constructor(private router: Router, private restUser:RestUserService) { }

  ngOnInit(): void {


  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.change()
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

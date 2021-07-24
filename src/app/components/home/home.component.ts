import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  vrf;

  constructor(private restUser: RestUserService) {
  }

  ngOnInit(): void {

  }
  
  ngDoCheck(){
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
}

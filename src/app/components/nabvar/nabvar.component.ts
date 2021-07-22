import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss']
})
export class NabvarComponent implements OnInit {

  token:string = null;
  user:string;

  constructor(private router: Router,  private restUser:RestUserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = localStorage.getItem('user');
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  logOut(){
    localStorage.clear();
    this.token = null;
    this.router.navigateByUrl('');
  }

}

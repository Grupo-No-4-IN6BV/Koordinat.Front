import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  interprises:[];

  constructor(private restUser: RestUserService) { }

  ngOnInit(): void {
   this.restUser.getInterprises().subscribe((res:any)=>{
     if(res.interprises){
       this.interprises = res.interprises;
     }
   })
  }

}

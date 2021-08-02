import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:[];

  constructor(private restUser:RestUserService) { }

  ngOnInit(): void {
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users;
      }else{
        alert(res.message)
      }
    })

  }

}

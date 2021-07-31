import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
let map: google.maps.Map;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  public user:User;

  constructor(private restUser: RestUserService) { 
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    const myLatLng = { lat: this.user.lat, lng: this.user.lng };
    const loader = new Loader({
      apiKey: "AIzaSyBs2lOkc7xTfnd5Yf7c5UNm3i4ztaQgSPo",
    });
    
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 15,
        center: myLatLng,
      });

      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Mi dirección",
      });
    });   
    
  }

}



@Component({
  selector: 'app-user-delete',
  templateUrl: './user.delete.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 

  }

}


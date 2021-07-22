import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { User } from 'src/app/models/user';

let map: google.maps.Map;
let markers: google.maps.Marker[] = [];

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public ley: any;
  public user!: User;
  public userSaved: string;

  
  constructor() { 
    this.user = new User('','','','','','','',0,0)
  }

  onSubmit(register:any){
    register.reset()
  }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: "AIzaSyBs2lOkc7xTfnd5Yf7c5UNm3i4ztaQgSPo",
    });
    
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 8,
      center: {lat:15.344372, lng:-90.456451},
      });

      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        this.addMarker(event.latLng!);
        this.user.lat = event.latLng!.toJSON().lat
        this.user.lng = event.latLng!.toJSON().lng
      });
    });   
}

 addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
  this.deleteMarkers()
  var marker = new google.maps.Marker({
    position,
    map,
  });
  markers.push(marker);

  this.ley = 1;
}

 setMapOnAll(map: google.maps.Map | null) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
 hideMarkers(): void {
  this.setMapOnAll(null);
}

 deleteMarkers(): void {
  this.hideMarkers();
  markers = [];
  this.ley = 0;
}
}

import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: 'HYBRID';
  
  constructor() { 
    this.lat = 15.406606;
    this.lng = -90.315400;
    this.zoom = 8;
    this.mapTypeId = 'HYBRID'
  }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyB71ABfUtlc4B5MBbHoOS2bKnhYqLqCfxU'
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: {lat:15.344372, lng:-90.456451},
        zoom: 6,
        mapTypeId: "terrain"
      })
    })
  }

  


}

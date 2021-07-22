import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from "@googlemaps/js-api-loader"
import { User } from 'src/app/models/user';
import { AuthService } from '../services/auth.service';

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

  
  constructor(public snackBar: MatSnackBar, private auth: AuthService) { 
    this.user = new User('','','','','','','','',0,0)
  }

  onSubmit(register){
    if(this.user.lat==0 && this.user.lng==0){
      this.snackBar.open('seleccione una ubicación', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else{
      this.auth.register(this.user).subscribe((res:any)=>{
        if(res.saveUser){
          this.snackBar.open(res.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
          register.reset();

        }else{
          alert(res.message);
        }
      },
      error=> console.log(<any>error)
      )   
    } 
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
  this.user.lat = 0;
  this.user.lng = 0;
  this.ley = 0;
}



}


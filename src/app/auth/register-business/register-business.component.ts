import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from '@googlemaps/js-api-loader';
import { Business } from 'src/app/models/business';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

let map: google.maps.Map;
let markers: google.maps.Marker[] = [];


@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss']
})
export class RegisterBusinessComponent implements OnInit {

  color: ThemePalette = 'warn';

  public business;
  public ley: any;
  public userSaved: string;
  public cargador = 0;

  constructor( public componentFactoryResolver: ComponentFactoryResolver, public snackBar: MatSnackBar, private auth: AuthService,
    private storage: AngularFireStorage) { 
    this.business = new Business('','','','',null,'',[],[])
  }

  ngOnInit(): void {
    this.business.image = null;
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



  onSubmit(register){
    this.auth.registerBusiness(this.business).subscribe((res:any)=>{
      if(res.businessSaved){
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
    error=> console.log(<any>error))
  }

  private image: any;
  private filePath: any;
  private downloadURL: Observable<string>

  handleImage(event:any){
    this.image = event.target.files[0]
    this.cargador = 1;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.business.image = urlImage
          this.cargador = 2;
        })
      })
    ).subscribe();
  }
}

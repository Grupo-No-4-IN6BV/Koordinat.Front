import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Business } from 'src/app/models/business';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
let map: google.maps.Map;

export interface DialogData {
  id: string
}

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.scss']
})
export class BusinessesComponent implements OnInit {

  public user:Business;

  constructor(private restUser: RestUserService, public dialog: MatDialog) { }

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
        title: "Mi Local",
      });
    });   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BusinessDeleteComponent, {
      height: '300px',
      width: '800px',
    });
  }

  openUpdate(): void{
    const dialogRef = this.dialog.open(BusinessUpdateComponent, {
      height: '400px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
}


@Component({
  selector: 'app-businesses-delete',
  templateUrl: 'businesses.delete.component.html',
  styleUrls: ['./businesses.component.scss']
})

export class BusinessDeleteComponent implements OnInit {

  public user: Business;
  public token;
  public uri;
  public possiblePass;
  public message;

  constructor(public dialogRef: MatDialogRef<BusinessDeleteComponent>,private restUser: RestUserService,private router:Router, public snackBar: MatSnackBar) { 
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }

  deleteAccount(){
    this.restUser.deleteBuss(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.businessElimined){
        alert(res.message)
      }else{
        localStorage.clear();
        this.onNoClick();
        this.snackBar.open(res.message, 'cerrar', {
        duration: 2000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.router.navigateByUrl('');
      }
    },
    error=> alert(error.error.message))
  }
}

@Component({
  selector: 'app-businesses-update',
  templateUrl: 'businesses.update.component.html',
  styleUrls: ['./businesses.component.scss']
})

export class BusinessUpdateComponent implements OnInit {

  public business;
  public token;
  public uri;
  public message;

  constructor(public dialogRef: MatDialogRef<BusinessUpdateComponent>,private restUser: RestUserService,private router:Router, public snackBar: MatSnackBar) { 
    this.business = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { 
  }

  updateBussiness(){
    delete this.business.password;
    this.restUser.updateBussines(this.business).subscribe((res:any)=>{
      if(res.updateBusiness){
        this.message = res.message;
        delete res.updateBusiness.password;
        this.business = res.updateBusiness;
        this.onNoClick();
        localStorage.setItem('user', JSON.stringify(this.business))
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
          });
      }else{
        this.message = res.message;
        this.business = this.restUser.getBussiness
      }
    })



  }

}

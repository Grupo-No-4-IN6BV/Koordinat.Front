import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CONNECTION } from 'src/app/services/global';
let map: google.maps.Map;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  public user:User;
  animal: string;
  name: string;

  constructor(private restUser: RestUserService, public dialog: MatDialog) { 
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

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      height: '300px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      height: '310px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'app-user-delete',
  templateUrl: './user.delete.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserDeleteComponent implements OnInit {

  public user: User;
  public token;
  public uri;
  public possiblePass;
  public message;


  constructor(public dialogRef: MatDialogRef<UserDeleteComponent> ,private restUser: RestUserService, private router:Router, public snackBar: MatSnackBar) { 
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAccount(){
    this.restUser.deleteUser(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.userFind){
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
  selector: 'app-user-update',
  templateUrl: './user.update.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserUpdateComponent implements OnInit {

  public user: User;
  public token;
  public uri;
  public message;

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent> ,private restUser: RestUserService, private router:Router, public snackBar: MatSnackBar) { 
    this.user = this.restUser.getUser();
    this.uri = CONNECTION.URI;
  }

  updateAccount(){
      delete this.user.password;
      delete this.user.role;
      this.restUser.updateUser(this.user).subscribe((res:any)=>{
        if(res.userUpdated){
          this.message = res.message;
          delete res.userUpdated.password;
          this.onNoClick();
          localStorage.setItem('user', JSON.stringify(res.userUpdated))
          this.snackBar.open(res.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: ['mat-toolbar', 'mat-accent']
            });
        }else{
          this.message = res.message;
          this.user = this.restUser.getUser();
        }
      },
      error=> alert(error.error.message))
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { DialogData } from '../white-list/white-list.component';

@Component({
  selector: 'app-shooping-car',
  templateUrl: './shooping-car.component.html',
  styleUrls: ['./shooping-car.component.scss']
})
export class ShoopingCarComponent implements OnInit {
  user;
  car:[];
  total;

  constructor(private restUser: RestUserService, public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.car = this.user.cartShopping;

    this.total = this.user.cartShopping.reduce((
      acc,
      obj,
    ) => acc + (obj.subtotal * obj.cantidad),
    0);
  }

  checkIn(){
    this.restUser.checkIn(this.user._id).subscribe((res:any)=>{
      if(res.userupd){
        delete res.userupd.password;
        this.user = res.userupd;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Pedido en Camino', '🚚💨', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.ngOnInit()
      }
    })
  }
  removeProduct(product): void {
    const dialogRef = this.dialog.open(ShoopingCarDeleteComponent, {
      height: '280px',
      width: '250px',
      data: {id: product._id, name: product.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


}

@Component({
  selector: 'app-shooping-car-delete',
  templateUrl: './shooping-car.delete.component.html',
  styleUrls: ['./shooping-car.component.scss']
})

export class ShoopingCarDeleteComponent implements OnInit {

  user;

  constructor(public dialogRef: MatDialogRef<ShoopingCarDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private restUser: RestUserService, public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.user = this.restUser.getUser();
  }


  removeItem(){
    this.restUser.removeItem(this.user._id, this.data.id).subscribe((res:any)=>{
      if(res.itemact){
        delete res.itemact.password;
        this.user = res.itemact;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Eliminado', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.onNoClick()
      }
      
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

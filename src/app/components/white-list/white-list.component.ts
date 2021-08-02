import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.scss']
})
export class WhiteListComponent implements OnInit {

  user;
  whitelist:[];
  auth;

  constructor(private restUser: RestUserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    if(this.user == null || undefined ){
      this.auth = 'onlyView';
    }else if(this.user.role == 'ROLE_USER'){
      this.auth = 'userView';
      
    }
    this.whitelist = this.user.wishList;
  }


  deleteWL(product): void {
    const dialogRef = this.dialog.open(WhiteListDeleteComponent, {
      height: '280px',
      width: '250px',
      data: {id: product._id, name: product.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openProduct(product): void {
    const dialogRef = this.dialog.open(ProductViewComponent, {
      height: '390px',
      width: '800px',
      data: {id: product._id, auth: this.auth},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}


@Component({
  selector: 'app-product-view',
  templateUrl: 'product.view.component.html',
  styleUrls: ['./white-list.component.scss']
})

export class ProductViewComponent implements OnInit {
  product;
  user;
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restProduct: RestProductService,
    private restUser: RestUserService, public snackBar: MatSnackBar, private router: Router) { 
      this.product = new Product('','',0,0,0,'','','','','','')
    }

  ngOnInit() { 
    this.user = this.restUser.getUser();
    
    this.restProduct.getProduct(this.data.id).subscribe((res:any)=>{
      if(res.product){
        this.product = res.product;
      }else{
        alert(res.message)
      }
    })
  }

  wishSet(){
    this.restUser.wishSet(this.user._id, this.product._id).subscribe((res: any)=>{
      if(res.userFind2){
        delete res.userFind2.password;
        this.user = res.userFind2;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Agregado lista de deseos ⭐', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
      }
      
    })
  }

  carshop(){
    this.restUser.shopping(this.user._id, this.product).subscribe((res:any)=>{
      if(res.userPush){
        delete res.userPush.password;
        this.user = res.userPush;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Agregado al Carrito', '🛒', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['blue-snackbar']
        });
        this.onNoClick()
        this.router.navigateByUrl('carrito')
      }else if(res.userAct){
        delete res.userAct.password;
        this.user = res.userAct;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Agregado al Carrito ', '☑️', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['blue-snackbar']
        });
        this.onNoClick()
        this.router.navigateByUrl('carrito')
      }else{
        alert(res.message)
      }
    })
  }
}


export interface DialogData {
  id: string;
  name: string;
  auth: string;
}

@Component({
  selector: 'app-white-list-delete',
  templateUrl: 'white-list.delete.component.html',
  styleUrls: ['./white-list.component.scss']
})

export class WhiteListDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<WhiteListDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,
    public snackBar: MatSnackBar) { }

    user;

  ngOnInit() { 
    this.user = this.restUser.getUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeWish(){
    this.restUser.removeWish(this.user._id, this.data.id).subscribe((res: any)=>{
      if(res.wishPull){
        localStorage.setItem('user', JSON.stringify(res.wishPull))
        this.snackBar.open('producto eliminada de los deseos', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.onNoClick();
      }
    })
  }
}

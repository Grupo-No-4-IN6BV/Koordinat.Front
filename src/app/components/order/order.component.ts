import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Loader } from '@googlemaps/js-api-loader';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
let map: google.maps.Map;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  user;
  orders:[];

  constructor(private restUser: RestUserService,
    private restProduct: RestProductService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.restProduct.orders(this.user._id).subscribe((res: any)=>{
      if(res.orders){
        this.orders = res.orders;
      }else{
        alert(res.message)
      }
    })
  }

  delOrder(order){
    this.restProduct.delOrder(order).subscribe((res:any)=>{
      if(res.productUpdate){
        this.snackBar.open('Pedido Terminado', 'cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    })
  }

  openMap(order): void {
    const dialogRef = this.dialog.open(OrderMapComponent, {
      height: '420px',
      width: '385px',
      data: {lat: order.lat, lng: order.lng}
    });
  }
}

export interface DialogData {
  lat: number,
  lng: number
}


@Component({
  selector: 'app-order-map',
  templateUrl: 'order.map.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderMapComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OrderMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() { 

    const myLatLng = { lat: this.data.lat, lng: this.data.lng };
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

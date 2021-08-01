import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-shooping-car',
  templateUrl: './shooping-car.component.html',
  styleUrls: ['./shooping-car.component.scss']
})
export class ShoopingCarComponent implements OnInit {
  user;
  car:[];
  total;

  constructor(private restUser: RestUserService,) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.car = this.user.cartShopping;

    this.total = this.user.cartShopping.reduce((
      acc,
      obj,
    ) => acc + (obj.subtotal * obj.cantidad),
    0);
    console.log("Total: ", this.total)
  }

}

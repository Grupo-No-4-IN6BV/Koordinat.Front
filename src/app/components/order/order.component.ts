import { Component, OnInit } from '@angular/core';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  user;
  orders:[];

  constructor(private restUser: RestUserService,private restProduct: RestProductService) { }

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


}

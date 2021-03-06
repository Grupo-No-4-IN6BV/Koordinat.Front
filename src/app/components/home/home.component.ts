import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { finalize } from 'rxjs/operators';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { ProductViewComponent } from '../white-list/white-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  vrf;
  products:[];
  categories:[];
  auth;

  constructor(private restUser: RestUserService,
    private storage: AngularFireStorage, 
    private restProduct: RestProductService, 
    private restCategory: RestCategoryService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.restProduct.getProductsNews().subscribe((res:any)=>{
      if(res.productsFind){
        this.products = res.productsFind;
        console.log(res.categorys)
      }else{
        alert(res.message)
      }
    })
    this.restCategory.getCategories().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;    
      }else{
        alert(res.message)
      }
    })
    this.change()
  }
  
  ngDoCheck(){
    this.user = this.restUser.getUser();
    
  }

  change(){
    if(this.user == null ){
      this.vrf = null;
      this.auth="onlyView";
    }else{
      if (this.user.role == 'ROLE_ADMIN'){
        this.vrf = 1;
      }else if (this.user.role == 'ROLE_USER'){
        this.vrf = 0;
      }else if (this.user.role == 'ROLE_BUSINESS'){
        this.vrf = 2;
        this.auth="onlyView";
      }
    }
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

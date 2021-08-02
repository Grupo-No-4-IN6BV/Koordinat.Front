import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { ProductViewComponent } from '../white-list/white-list.component';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss']
})
export class CatalogueListComponent implements OnInit {

  @Input() categoryS : [];
  products: [];
  categories:[];
  search;
  searchName;
  user;
  auth;
  constructor(private restProduct: RestProductService, private restCategory: RestCategoryService,
    private restUser: RestUserService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
 
    this.user = this.restUser.getUser();
    if(this.user == null || undefined ){
      this.auth = 'onlyView';

      
    }else if(this.user.role == 'ROLE_USER'){
      this.auth = 'userView';
      
    }
    this.restProduct.getProducts().subscribe((res:any)=>{
      if(res.productsFind){
        this.products = res.productsFind;
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

export interface DialogData {
  id: string;
}
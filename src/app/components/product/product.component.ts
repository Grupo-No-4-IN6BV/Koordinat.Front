import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { ProductViewComponent } from '../white-list/white-list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product;
  products:[];
  categories:[];
  user;

  constructor(public dialog: MatDialog, private restProduct: RestProductService, 
    private restCategory: RestCategoryService, private restUser: RestUserService) { 
    this.product = new Product('','',0,0,0,'','','','','','')
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.restProduct.getProductsMain(this.user._id).subscribe((res:any)=>{
      if(res.products){
        this.products = res.products;
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

  openSaveCategory(): void {
    const dialogRef = this.dialog.open(ProductSaveComponent, {
      height: '460px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  removeProduct(product): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      height: '280px',
      width: '250px',
      data: {id: product._id, name: product.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openProduct(product): void {
    const dialogRef = this.dialog.open(ProductViewComponent, {
      height: '400px',
      width: '800px',
      data: {id: product._id, auth: 'onlyView'},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(product): void{
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      height: '400px',
      width: '800px',
      data: {id: product._id},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}

export interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-product-delete',
  templateUrl: 'product.delete.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restProduct: RestProductService,
    public snackBar: MatSnackBar,) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  removeProduct(){
    this.restProduct.removeProduct(this.data.id).subscribe((res:any)=>{
      if(res.productRemoved){
        this.snackBar.open(res.message, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });

        this.onNoClick();
      }
    })
  }
}


@Component({
  selector: 'app-product-save',
  templateUrl: 'product.save.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductSaveComponent implements OnInit {
  color: ThemePalette = 'warn';
  
  public product: Product;
  public category: Category;
  private image: any;
  private filePath: any;
  onload;
  user;
  limit = false;
  categories:[];
  selectedCate;
  public cargador = 0;

  constructor(public dialogRef: MatDialogRef<ProductSaveComponent>,
    private restProduct: RestProductService, public snackBar: MatSnackBar,
    private storage: AngularFireStorage, private restCategory: RestCategoryService,
    private restUser: RestUserService) {
      this.category = new Category('','','','')
      this.product = new Product('','',0,0,0,'','','','','','')
    }

    ngOnInit() {
      this.user = this.restUser.getUser();
      this.restCategory.getCategories().subscribe((res:any)=>{
        if(res.categories){
          this.categories = res.categories;    
        }else{
          alert(res.message)
        }
      })
    }
  
  onSubmit(saveProduct){
    this.restProduct.saveCategory(this.user._id, this.product).subscribe((res:any)=>{
      if(res.productSaved){
        this.snackBar.open(res.message, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.onNoClick();
      }else{
        alert(res.message)
      }
    })

  }

  handleImage(event:any){
    this.cargador = 1;
    this.image = event.target.files[0]
    this.onload = 1;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          if(this.product.img1==''){
            this.product.img1 = urlImage
          }else{
            if(this.product.img2==''){
              this.product.img2 = urlImage
            }else{
              if(this.product.img3==''){
                this.product.img3 = urlImage
              }else{
                if(this.product.img4==''){
                  this.product.img4 = urlImage
                }else{
                  if(this.product.img5==''){
                    this.product.img5 = urlImage
                  }else{
                    this.limit= true;
                  }
                }
              }
            }
          }
          //this.product.img1 = urlImage
          this.cargador = 2;
        })
      })
    ).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-product-update',
  templateUrl: 'product.update.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductUpdateComponent implements OnInit {

  public product: Product;
  public message;
  public category: Category;
  public token;
  categories:[];
  selectedCate;

  constructor(public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restCategory: RestCategoryService ,private restProduct: RestProductService,
    public snackBar: MatSnackBar,) { 
      this.product = new Product('','',0,0,0,'','','','','','')
      this.category = new Category('','','','')
    }

  ngOnInit() { 
    this.restCategory.getCategories().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;    
      }else{
        alert(res.message)
      }
    })
    this.restProduct.getProduct(this.data.id).subscribe((res:any)=>{
      if(res.product){
        this.product = res.product;
        console.log(this.product)
      }else{
        alert(res.message)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  updateProduct(){
    this.restProduct.updateProduct(this.product).subscribe((res:any)=>{
      if(res.productUpdate){
        this.message = res.message;
        this.onNoClick();
        localStorage.setItem('product', JSON.stringify(res.productUpdate))
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-accent']
          });
      }else{
        this.message = res.message;
      }
    }, 
    error=> alert(error.error.message))
  }
}
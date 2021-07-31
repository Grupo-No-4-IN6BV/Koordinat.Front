import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { Loader } from '@googlemaps/js-api-loader';
import { finalize } from 'rxjs/operators';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestProductService } from 'src/app/services/restProduct/rest-product.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

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

  constructor(private restUser: RestUserService,private storage: AngularFireStorage, private restProduct: RestProductService, private restCategory: RestCategoryService) {
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
  
  }
  
  ngDoCheck(){
    this.user = this.restUser.getUser();
    this.change()
  }

  change(){
    if(this.user == null ){
      this.vrf = null;
    }else{
      if (this.user.role == 'ROLE_ADMIN'){
        this.vrf = 1;
      }else if (this.user.role == 'ROLE_USER'){
        this.vrf = 0;
      }else if (this.user.role == 'ROLE_BUSINESS'){
        this.vrf = 2;
      }
    }
  }

  private image: any;
  private filePath: any;
  color: ThemePalette = 'warn';
  public cargador = 0;
  imageurl;

  handleImage(event:any){
    this.image = event.target.files[0]
    this.cargador = 1;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.imageurl = urlImage
          this.cargador = 2;
        })
      })
    ).subscribe();
  }
}

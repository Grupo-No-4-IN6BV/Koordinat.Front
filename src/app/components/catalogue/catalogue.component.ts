import { keyframes, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { CatalogueListComponent } from '../catalogue-list/catalogue-list.component';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  categoryS:[];
  categories:[];
  load;
  @ViewChild('appChangesLR', { read: ViewContainerRef }) myRef
  
  constructor(private restCategory: RestCategoryService,public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.restCategory.getCategories().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;
      }else{
        alert(res.message)
      }
    })
  }

  select(category){
    this.categoryS = category._id;
  }
}




@Component({
  selector: 'app-catalogue-sidebar',
  templateUrl: 'catalogue.sidebar.component.html'
})

export class CatalogueSidebarComponent implements OnInit {

  categories:[];
  
  constructor( private restCategory: RestCategoryService) { }

  ngOnInit() { 

    this.restCategory.getCategories().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;
      }else{
        alert(res.message)
      }
    })
  }
}
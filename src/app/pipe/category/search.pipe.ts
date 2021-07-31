import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  
  transform(products: any, search: any): any {
    if(search == undefined){
      return products;
    }else{
      return products.filter( products => {
        return products.category.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}

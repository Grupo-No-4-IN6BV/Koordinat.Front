import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName'
})
export class SearchNamePipe implements PipeTransform {

  transform(products: any, searchName: any): any {
    if(searchName == undefined){
      return products;
    }else{
      return products.filter( products => {
        return products.name.toLowerCase().includes(searchName.toLowerCase())
      })
    }
  }
}

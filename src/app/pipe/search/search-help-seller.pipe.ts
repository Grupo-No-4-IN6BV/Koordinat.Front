import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHelpSeller'
})
export class SearchHelpSellerPipe implements PipeTransform {

  transform(questions: any, searchHelpSeller: any): any {
    if(searchHelpSeller == undefined){
      return questions;
    }else{
      return questions.filter( question=>{
        return question.titulo.toLowerCase().includes(searchHelpSeller.toLowerCase())
      })
    }
  }

}

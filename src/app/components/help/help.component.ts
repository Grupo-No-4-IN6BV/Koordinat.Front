import { Component, OnInit } from '@angular/core';



import { client } from './client';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  help: any[];
  searchHelpSeller;
  inp = true;

  constructor() { 
    Object.assign(this, { help });
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    
    if(this.searchHelpSeller=='' || this.searchHelpSeller==undefined || this.searchHelpSeller==null){
      this.inp=true;
    }else{
      this.inp=false;
    }
  }
}


import { help } from './help';

@Component({
  selector: 'app-help-client',
  templateUrl: './help.client.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpClientComponent implements OnInit {

  client: any[];
  searchHelpSeller;
  inp = true;

  constructor() { 
    Object.assign(this, { client });
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    
    if(this.searchHelpSeller=='' || this.searchHelpSeller==undefined || this.searchHelpSeller==null){
      this.inp=true;
    }else{
      this.inp=false;
    }
  }
  

}

@Component({
  selector: 'app-help-info',
  templateUrl: './help.info.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


import { questions } from './data';

@Component({
  selector: 'app-help-seller',
  templateUrl: './help.seller.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpSellerComponent implements OnInit {

  questions: any[];
  searchHelpSeller;
  inp = true;

/*Hola Josue Noj, soy yo de nuevo*/ 
  constructor() {
    Object.assign(this, { questions });
   }

  ngOnInit(): void {
  }

  ngDoCheck(){
    
    if(this.searchHelpSeller=='' || this.searchHelpSeller==undefined || this.searchHelpSeller==null){
      this.inp=true;
    }else{
      this.inp=false;
    }
  }

}


@Component({
  selector: 'app-help-seller',
  templateUrl: './help.termsacodes.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpTermsacodesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

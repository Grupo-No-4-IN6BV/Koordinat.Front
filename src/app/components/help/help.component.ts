import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-help-client',
  templateUrl: './help.client.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    console.log(this.questions)
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

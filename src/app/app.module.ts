import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { HelpClientComponent, HelpComponent, HelpInfoComponent, HelpSellerComponent, HelpTermsacodesComponent } from './components/help/help.component';
import { UserComponent, UserDeleteComponent, UserUpdateComponent } from './components/user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './styles/material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent  } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RegisterBusinessComponent } from './auth/register-business/register-business.component';
import { PopperDirective } from './directives/popper.directive';
import { BUCKET } from '@angular/fire/storage';
import { UsersComponent } from './components/users/users.component';
import { BusinessDeleteComponent, BusinessesComponent, BusinessUpdateComponent } from './components/businesses/businesses.component';
import { CategoryComponent, CategoryDeleteComponent, CategorySaveComponent, CategoryUpdateComponent } from './components/category/category.component';

import { ProductComponent, ProductDeleteComponent, ProductSaveComponent, ProductUpdateComponent } from './components/product/product.component';
import { ProductViewComponent, WhiteListComponent, WhiteListDeleteComponent } from './components/white-list/white-list.component';
import { ShoopingCarComponent, ShoopingCarDeleteComponent } from './components/shooping-car/shooping-car.component';
import { OfferComponent } from './components/offer/offer.component';
import { CatalogueComponent, CatalogueSidebarComponent } from './components/catalogue/catalogue.component';
import { SearchHelpSellerPipe } from './pipe/search/search-help-seller.pipe';
import * as Hammer from 'hammerjs';
import { CatalogueListComponent } from './components/catalogue-list/catalogue-list.component';
import { SearchPipe } from './pipe/category/search.pipe';
import { SearchNamePipe } from './pipe/category/search-name.pipe';
import { OrderComponent } from './components/order/order.component';
import { BusinessComponent } from './components/business/business.component';




@NgModule({
  declarations: [
    // <<Main>>
    AppComponent,
    HomeComponent,
    NabvarComponent,


    // <<User>>
    UserComponent,
    UserDeleteComponent,
    UserUpdateComponent,
    UsersComponent,

    // <<Auth>>
    LoginComponent,
    RegisterComponent,
    RegisterBusinessComponent,


    // <<Services Help>>
    HelpComponent,
    HelpClientComponent,
    HelpInfoComponent,
    HelpSellerComponent,
    HelpTermsacodesComponent,
    PopperDirective,

    //Business
    BusinessesComponent,
    BusinessDeleteComponent,
    BusinessUpdateComponent,
    
    WhiteListComponent,
    ShoopingCarComponent,
    OfferComponent,
    CatalogueComponent,


    //Categorias
    CategoryComponent,
    CategorySaveComponent,
    CatalogueSidebarComponent,
    ShoopingCarDeleteComponent,
    CategoryUpdateComponent,
    CategoryDeleteComponent,

    //Productos
    ProductComponent,
    ProductSaveComponent,
    SearchHelpSellerPipe,
    CatalogueListComponent,
    SearchPipe,
    SearchNamePipe,
    ProductViewComponent,
    WhiteListDeleteComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
    OrderComponent,
    BusinessComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    HammerModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  
  providers: [
    {provide: BUCKET, useValue: 'gs://koordinatg4.appspot.com/'}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})


export class AppModule { }

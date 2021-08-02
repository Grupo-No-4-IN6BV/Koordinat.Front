import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterBusinessComponent } from './auth/register-business/register-business.component';
import { RegisterComponent } from './auth/register/register.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { CategoryComponent } from './components/category/category.component';
import { HelpClientComponent, HelpComponent, HelpInfoComponent, HelpSellerComponent, HelpTermsacodesComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { OfferComponent } from './components/offer/offer.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { ShoopingCarComponent } from './components/shooping-car/shooping-car.component';

import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { WhiteListComponent } from './components/white-list/white-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'users', component: UsersComponent},
  {path: 'deseos', component: WhiteListComponent},
  {path: 'carrito', component: ShoopingCarComponent},
  {path: 'ofertas', component: OfferComponent},
  {path: 'catalogo', component: CatalogueComponent},

  // <<Business>>
  {path: 'empresas', component: BusinessesComponent},
  {path: 'categorias', component: CategoryComponent},
  {path: 'productos', component: ProductComponent},
  {path: 'pedidos', component: OrderComponent},

  // << Auth >> 
  {path: 'login', component: LoginComponent}  ,
  {path: 'register', component: RegisterComponent},
  {path: 'registar-empresa', component: RegisterBusinessComponent},

  // <<Services Help>>
  {path: 'ayuda', component: HelpComponent},
  {path: 'informacion', component: HelpInfoComponent},
  {path: 'ayuda/vendedor', component: HelpSellerComponent},
  {path: 'terminos&condiciones', component: HelpTermsacodesComponent},
  {path: 'ayuda/usuario', component: HelpClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HelpClientComponent, HelpComponent, HelpInfoComponent, HelpSellerComponent, HelpTermsacodesComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';

import { UserComponent, UserDeleteComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent},

  // << Auth >>
  {path: 'login', component: LoginComponent}  ,
  {path: 'register', component: RegisterComponent},

  // <<Services Help>>
  {path: 'ayuda', component: HelpComponent},
  {path: 'informacion/empresa', component: HelpInfoComponent},
  {path: 'ayuda/vendedor', component: HelpSellerComponent},
  {path: 'terminos&condiciones', component: HelpTermsacodesComponent},
  {path: 'ayuda/usuario', component: HelpClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

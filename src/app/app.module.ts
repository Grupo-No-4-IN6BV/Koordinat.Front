import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { HelpClientComponent, HelpComponent, HelpInfoComponent, HelpSellerComponent, HelpTermsacodesComponent } from './components/help/help.component';
import { UserComponent, UserDeleteComponent } from './components/user/user.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './styles/material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    // <<Main>>
    AppComponent,
    HomeComponent,
    NabvarComponent,

    // <<User>>
    UserComponent,
    UserDeleteComponent,

    // <<Auth>>
    LoginComponent,
    RegisterComponent,

    // <<Services Help>>
    HelpComponent,
    HelpClientComponent,
    HelpInfoComponent,
    HelpSellerComponent,
    HelpTermsacodesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

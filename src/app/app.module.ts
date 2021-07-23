import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { HelpClientComponent, HelpComponent, HelpInfoComponent, HelpSellerComponent, HelpTermsacodesComponent } from './components/help/help.component';
import { UserComponent, UserDeleteComponent } from './components/user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './styles/material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent  } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { RegisterBusinessComponent } from './auth/register-business/register-business.component';
import { PopperDirective } from './directives/popper.directive';
import { BUCKET } from '@angular/fire/storage';



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
    RegisterBusinessComponent,


    // <<Services Help>>
    HelpComponent,
    HelpClientComponent,
    HelpInfoComponent,
    HelpSellerComponent,
    HelpTermsacodesComponent,
    RegisterBusinessComponent,
    PopperDirective,


    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
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

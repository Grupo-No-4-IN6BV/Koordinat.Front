import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;
  public token: string;
  public message;

  constructor( private router: Router, public snackBar: MatSnackBar, private auth: AuthService) { 
    this.user = new User('','','','','','','','',0,0)
  }

  ngOnInit(): void {
  }

  onSubmit(){
    localStorage.clear();
    this.auth.login(this.user, 'true').subscribe((res:any)=>{
      if(!res.token){
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }else if(res.user){
        delete res.user.password;
        this.token = res.token;
        console.log(res.user)
        console.log(res.token)
        if(this.token.length <= 0){
          alert('el Token no se genero de manera correcta') 
        }else{
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(res.user))

          this.snackBar.open(res.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
          this.router.navigateByUrl('');
        }
      }else{
        delete res.business.password;
        this.token = res.token;
        if(this.token.length <= 0){
          alert('el Token no se genero de manera correcta') 
        }else{
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(res.business))

          this.snackBar.open(res.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
          this.router.navigateByUrl('');
        }
      }
    },
    error=> this.message = error.error.message
    )
  }

}

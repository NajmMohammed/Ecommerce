import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly  authService= inject(AuthService);
  private readonly  router= inject(Router);
  success:string = "";

  isLoading:boolean = false;
  errorMsg:string = "" ;

loginForm:FormGroup = new FormGroup({
 email:new FormControl(null , [Validators.required, Validators.email]),

 password:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),

} )

submitForm():void{
if (this.loginForm.valid) {
  this.isLoading= true;
  this.authService.sendLoginForm(this.loginForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.message === 'success'){
        this.isLoading= false;
  setTimeout(() => {

    localStorage.setItem("token" , res.token)      
    this.authService.getUserData();
    this.router.navigate(['/home']);
  }, 1000);
        this.success = res.message;
      }
    }
    ,
    error:(err:HttpErrorResponse)=>{
      console.log(err);
  this.errorMsg =    err.error.message
      this.isLoading=false
    }
    
    })
}
  }

}

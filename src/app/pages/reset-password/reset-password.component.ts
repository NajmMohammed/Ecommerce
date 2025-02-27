import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetpasswordService } from '../../core/services/resetpassword/resetpassword.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
steps:number = 1;

private readonly resetpasswordService = inject(ResetpasswordService)
private readonly toastrService = inject(ToastrService)
private readonly authService = inject(AuthService)
private readonly Router = inject(Router)

submitEmail(){
  this.resetpasswordService.verifyEmail(this.sendEmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg == "success"){
        this.steps=2;
        this.toastrService.success(res.message)

      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
  
}
submitCode(){
this.resetpasswordService.verifyCode(this.verifyCode.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.status == 'Success'){
      this.steps = 3;
    }
  }
})
}
submitPassword(){
this.resetpasswordService.resetPassword(this.resetPassword.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.token){
  localStorage.setItem('token',res.token)
  this.authService.getUserData();
  this.Router.navigate(['/home'])

    }
  }
})
}
sendEmail:FormGroup = new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email])
})

verifyCode:FormGroup = new FormGroup({
  resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6} $/)])
})

resetPassword:FormGroup = new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email]),
  newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
})
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
public readonly router = inject(Router)
  userData:any;

sendRegisterForm(data:object):Observable<any>{
 return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data)
}

sendLoginForm(data:object):Observable<any>{
 return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
}

getUserData():void {

this.userData =   jwtDecode(localStorage.getItem("token") !)

}

logOut():void{
localStorage.removeItem("token")

this.userData = null

this.router.navigate(['/login'])


}


}

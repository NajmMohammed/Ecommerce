import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Enviroment/environment';
import { Iauth } from '../../../shared/interfaces/iauth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private httpClient:HttpClient) { }

  verifyEmail(payload:Iauth):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,
payload
    )
  }
  verifyCode(payload:Iauth):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,
payload
    )
  }
  resetPassword(payload:Iauth):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,
payload
    )
  }
}

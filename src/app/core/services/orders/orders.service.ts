import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { };
  cartToken:any = localStorage.getItem("cartID");
  myToken:any = localStorage.getItem("token");

  checkoutPayment(id:string , data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,

      
       { "shippingAddress" : data},
       {
        headers:{
          token : this.myToken
        }
       }

    )
  }

getUserOrders(token:string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.cartToken}`)
}
}

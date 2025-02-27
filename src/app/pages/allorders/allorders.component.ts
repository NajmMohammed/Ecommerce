import { Component, OnInit, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponentt implements OnInit{

private readonly ordersService = inject (OrdersService);
myCartId:string = ''

ngOnInit(): void {
this.ordersService.getUserOrders(this.myCartId).subscribe({
  next:(res)=>{
    console.log(res)
  },
  error:(err)=>{
    console.log(err)
  }
})
}

getOrdersData():void{
 this.myCartId  = localStorage.getItem('cartID') !
}
}

import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

private readonly cartService = inject(CartService)
private readonly ngxSpinnerService = inject(NgxSpinnerService)

cartDetails:Icart ={} as Icart;


  ngOnInit(): void {
    this.getCartData()
  }

  getCartData():void{
    this.ngxSpinnerService.show()

    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
      this.cartDetails = res.data;
      this.ngxSpinnerService.hide()


      },
      error:(err)=>{
        console.log(err)
      }



    })
  }

  removeItem(id:string):void{
    this.ngxSpinnerService.show()

    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data;
        this.cartService.cartNumber.next(res.numOfCartItems)
        this.ngxSpinnerService.hide()

      }
        ,error:(err)=>{
          console.log(err)
        }
    })
  }

  updateCount(id:string,count:number):void{
    this.ngxSpinnerService.show()
    this.cartService.updateCartQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data
        this.ngxSpinnerService.hide()

      },
      error:(err)=>{
        console.log(err)
      }
       
    })
  }

  clearUserCart():void {
    this.cartService.clearCart().subscribe({
      next:(res)=>{
      this.getCartData();
      if (res.message === 'success') {
        this.cartService.cartNumber.next(0)
      }
   

      },
      error:(err)=>
        console.log(err)
    })
  }
}

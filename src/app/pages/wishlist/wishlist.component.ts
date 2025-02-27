import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, OnInit, inject,} from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  imports : [NgFor,CurrencyPipe],
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
private readonly wishlistService = inject(WishlistService);
private readonly cartService = inject(CartService);
private readonly toastrService = inject(ToastrService);
private readonly ngxSpinnerService = inject(NgxSpinnerService);
wishlistDetails:Iwishlist[] = [];

getLoggedUserWishlist():void{
  this.ngxSpinnerService.show()
  this.wishlistService.getWishlistData().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.wishlistDetails = res.data;
      this.ngxSpinnerService.hide()
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

removeItem(id:string):void{
  this.ngxSpinnerService.show()
  this.wishlistService.removeSpecificWishlistItem(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.getLoggedUserWishlist()
      this.ngxSpinnerService.hide()

    },
    error:(err)=>{
      console.log(err)
    }
  })
}

addToCart(id:string):void {
  this.ngxSpinnerService.show()
  this.cartService.addProductToCart(id).subscribe({
    
    next:(res)=>{
      console.log(res);
  if (res.status === 'success') {
    this.toastrService.success(res.message, );
    this.cartService.cartNumber.next(res.numOfCartItems)
this.removeItem(id)
this.ngxSpinnerService.hide()
  
  }
    },
    error:(err)=>{
      console.log(err)
    }
  })
    }



ngOnInit(): void {
  this.getLoggedUserWishlist();

}
}

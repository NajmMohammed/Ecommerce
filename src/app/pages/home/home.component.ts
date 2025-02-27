import { CategoriesService } from './../../shared/categories/categories.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, OnInit, inject } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule ,CurrencyPipe,SearchPipe,FormsModule,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  private readonly categoriesService= inject(CategoriesService);
  private readonly cartService= inject(CartService);
  private readonly ngxSpinnerService= inject(NgxSpinnerService);
  private readonly toastrService= inject(ToastrService);
  private readonly wishlistService= inject(WishlistService);

userInput:any= "";

  customTopSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
items:1,
    nav: false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-circle-left text-black text-3xl"></i>', '<i class="fa-regular fa-circle-right text-black text-3xl"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData()
      }

products:IProduct[]=[];
categories:ICategory[]= []
getProductsData():void{
  this.productService.getAllProducts().subscribe({
    next:(res) =>{
      console.log(res.data);
      
this.products = res.data
    },
    error: (err) =>{
      console.log(err);
    }
  })
}
getCategoryData(){
  this.ngxSpinnerService.show()
  this.categoriesService.getAllCategories().subscribe({
next:(res)=>{
  console.log(res.data);
  this.categories = res.data;
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
  this.ngxSpinnerService.hide()

}
  },
  error:(err)=>{
    console.log(err)
  }
})
  }

  addToWishlist(id:string):void{
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, );
        
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}

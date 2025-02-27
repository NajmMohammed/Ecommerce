import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from './../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../shared/categories/categories.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,CurrencyPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly productService = inject(ProductsService);
  private readonly categoriesService= inject(CategoriesService);
private readonly cartservice = inject(CartService);
private readonly toastrService = inject(ToastrService);
private readonly ngxSpinnerService = inject(NgxSpinnerService);
private readonly wishlistService= inject(WishlistService);

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
    this.ngxSpinnerService.show();
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
    ngOnInit(): void {
  this.getProductsData();
  this.getCategoryData()
    }
  
addToCart(id:string):void{
  this.ngxSpinnerService.show()
  this.cartservice.addProductToCart(id).subscribe({
    next:(res)=>{

      console.log(res)

      if (res.status === 'success') {
        this.toastrService.success(res.message, );
        this.cartservice.cartNumber.next(res.numOfCartItems)
        this.ngxSpinnerService.hide()
;
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
addToWishlist(id:string):void{
  this.ngxSpinnerService.show()
  this.wishlistService.addProductToWishlist(id).subscribe({
    next:(res)=>{
      console.log(res);
      if (res.status === 'success') {
        this.toastrService.success(res.message, );
        this.ngxSpinnerService.hide()
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
  
  userInput:any= "";
}

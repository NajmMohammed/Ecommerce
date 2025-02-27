import { ProductsService } from './../../core/services/products/products.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class  DetailsComponent  implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
private readonly ngxSpinnerService = inject(NgxSpinnerService);

  productId:any;
  productDetails:IProduct = {} as IProduct;

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe({
      next:(res)=> {      this.ngxSpinnerService.show();
        this.productId = res.get("id");
        this.productsService.getSpecificProducts(this.productId).subscribe({
          next:(res)=>{
this.productDetails = res.data      
this.ngxSpinnerService.hide();    },
          error:(err)=>{
console.log(err)
          }
        })

      },
      error:(err)=> {
        console.log(err)
      },
    })


  }


  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        if (res.status === 'success') {
          this.toastrService.success(res.message, );
          this.cartService.cartNumber.next(res.numOfCartItems)
        
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}

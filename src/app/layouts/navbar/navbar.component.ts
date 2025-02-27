import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
isLoggedIn = input<boolean>();
public readonly authservice = inject(AuthService)
public readonly cartService = inject(CartService);
cartCounter!:number;

ngOnInit(): void {
  this.cartService.cartNumber.subscribe({
    next:(value)=>{
this.cartCounter = value
    }
  })

  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartService.cartNumber.next(res.numOfCartItems)
    }
  })
}
}

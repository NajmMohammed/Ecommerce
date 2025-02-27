import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},


{path:'',component:AuthLayoutComponent , canActivate:[loggedInGuard], children:[


{path:'login',loadComponent:()=> import('./pages/login/login.component').then((c)=>c.LoginComponent),title:'login'},
{path:'register',loadComponent:()=> import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
{path:'resetPassword',loadComponent:()=> import('./pages/reset-password/reset-password.component').then((c)=>c.ResetPasswordComponent),title:'resetPassword'}

]},
{path:'',component:BlankLayoutComponent,children:[
    {path:'resetPassword',loadComponent:()=> import('./pages/reset-password/reset-password.component').then((c)=>c.ResetPasswordComponent),title:'resetPassword'},
{path:'home',loadComponent:()=> import('./pages/home/home.component').then( (c)=>c.HomeComponent),title:'home',
   canActivate:[authGuard] 
},
{path:'cart',loadComponent:()=> import('./pages/cart/cart.component').then((c)=>c.CartComponent) ,title:'cart',
    canActivate:[authGuard] },
    {path:'wishlist',loadComponent:()=> import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent) ,title:'wishlist',
        canActivate:[authGuard] },
{path:'allorders',loadComponent:()=> import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponentt) ,title:'allorders',
    canActivate:[authGuard] },
{path:'products',loadComponent:()=> import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products',
    canActivate:[authGuard] },
{path:'brands',loadComponent:()=> import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands',
    canActivate:[authGuard] },
{path:'categories',loadComponent:()=> import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent),title:'categories',
    canActivate:[authGuard] },
{path:'checkout/:id',loadComponent:()=> import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent),title:'checkout',
    canActivate:[authGuard] },
{path:'details/:id',loadComponent:()=> import('./pages/details/details.component').then((c)=>c.DetailsComponent),title:'details',
    canActivate:[authGuard] },
{path:'**',loadComponent:()=> import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent)},

]}
];

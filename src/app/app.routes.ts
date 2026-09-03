import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';
import { CartCheckout } from './pages/cart-checkout/cart-checkout';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'product/:id', component: ProductDetail },
  { path: 'auth', component: AuthComponent },
  { 
    path: 'checkout', 
    component: CartCheckout
  },
  { path: 'cart', component: CartCheckout },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', redirectTo: '' }
];
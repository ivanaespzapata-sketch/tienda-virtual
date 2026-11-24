
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { AuthService } from '../../services/auth.services';
import { CartItem } from '../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSearchOpen = false;
  searchQuery = '';

  wishlistCount = 0;
  cartCount = 0;
  cartTotal = 0;
  subtotal = 0;
  cartItems: CartItem[] = [];
  currentUser: any = null;

  private cartSub!: Subscription;
  private wishlistSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private shopService: ShopService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSub = this.shopService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
      const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      this.cartTotal = total;
      this.subtotal = total;
      this.cdr.detectChanges();
    });

    this.wishlistSub = this.shopService.wishlist$.subscribe((ids: number[]) => {
      this.wishlistCount = ids.length;
      this.cdr.detectChanges();
    });

    this.userSub = this.shopService.currentUser$.subscribe((user: any) => {
      this.currentUser = user;
      this.cdr.detectChanges();
    });
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Buscando:', this.searchQuery);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    this.shopService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.shopService.removeFromCart(productId);
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.currentUser = null;
      this.cdr.detectChanges();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('No se pudo cerrar sesión. Intenta nuevamente.');
    }
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.wishlistSub) this.wishlistSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }
}

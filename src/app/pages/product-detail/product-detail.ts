// src/app/pages/product-detail/product-detail.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { Product, CartItem } from '../../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit, OnDestroy {
  product: Product | undefined;
  quantity: number = 1;

  // Variantes / acabados opcionales para joyería
  variants: string[] = ['Oro 14k', 'Plata Sterling', 'Oro Rosé'];
  selectedVariant: string = 'Oro 14k';

  private cartSub!: Subscription;
  private currentCartItems: CartItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const productId = +idParam;
      this.product = this.shopService.getProductById(productId);
    }

    this.cartSub = this.shopService.cart$.subscribe(items => {
      this.currentCartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const alreadyInCart = this.currentCartItems.some(item => item.product.id === this.product!.id);

    // Si aún no está en el carrito, lo agregamos una vez con toggleCart
    if (!alreadyInCart) {
      this.shopService.toggleCart(this.product);
    }

    // Si eligió más de 1 unidad, ajustamos la cantidad exacta en el carrito
    if (this.quantity > 1) {
      this.shopService.updateQuantity(this.product.id, this.quantity);
    }

    alert(`¡${this.quantity} x ${this.product.title} (${this.selectedVariant}) agregado al carrito con éxito!`);
  }

  isInCart(): boolean {
    if (!this.product) return false;
    return this.currentCartItems.some(item => item.product.id === this.product!.id);
  }
}
// src/app/pages/product-detail/product-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  quantity: number = 1;

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
    if (this.product) {
      // Agregamos el producto y ajustamos la cantidad si es mayor a 1
      for (let i = 0; i < this.quantity; i++) {
        this.shopService.toggleCart(this.product);
      }
      alert('¡Producto agregado al carrito con éxito!');
    }
  }

  isInCart(): boolean {
    if (!this.product) return false;
    // Lógica opcional para verificar si está en el carrito
    return false; 
  }
}
// src/app/pages/home/home.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { Product, CartItem } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  // Filtros
  searchQuery: string = '';
  selectedCategory: string = 'Todas';
  maxPrice: number = 1500;
  sortOrder: string = 'default';

  // Categorías alineadas exactamente con shop.service.ts
  categoriesList: string[] = [
    'Todas',
    'Anillos',
    'Aretes',
    'Charms',
    'Collares',
    'Pulseras'
  ];

  // Notificación flotante (Toast)
  toastMessage: string | null = null;
  toastType: 'success' | 'danger' = 'success';
  private toastTimeout: any;

  // Vista Previa Rápida (Quick View)
  selectedProduct: Product | null = null;

  // Control de reactividad del carrito
  private cartSub!: Subscription;
  private currentCartItems: CartItem[] = [];

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products = this.shopService.getProducts();

    if (this.products.length > 0) {
      const highestPrice = Math.max(...this.products.map(p => p.price));
      if (highestPrice > this.maxPrice) {
        this.maxPrice = Math.ceil(highestPrice / 100) * 100;
      }
    }

    this.cartSub = this.shopService.cart$.subscribe(items => {
      this.currentCartItems = items;
    });

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    const list = this.products.filter(product => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        this.selectedCategory === 'Todas' ||
        product.category.toLowerCase() === this.selectedCategory.toLowerCase();

      const matchesPrice = product.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (this.sortOrder === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.sortOrder === 'popularity') {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0) || (b.rating || 0) - (a.rating || 0));
    }

    this.filteredProducts = list;
  }

  addToCart(product: Product): void {
    this.toggleCart(product);
  }

  toggleCart(product: Product): void {
    const isAdded = this.shopService.toggleCart(product);

    if (isAdded) {
      this.showToast('Producto añadido', 'success');
    } else {
      this.showToast('Producto eliminado', 'danger');
    }
  }

  isInCart(productId: number): boolean {
    return this.currentCartItems.some(item => item.product.id === productId);
  }

  private showToast(message: string, type: 'success' | 'danger'): void {
    this.toastMessage = message;
    this.toastType = type;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 2500);
  }

  toggleWishlist(productId: number): void {
    this.shopService.toggleWishlist(productId);
  }

  isInWishlist(productId: number): boolean {
    return this.shopService.isInWishlist(productId);
  }

  openQuickView(product: Product): void {
    this.selectedProduct = product;
  }

  closeQuickView(): void {
    this.selectedProduct = null;
  }
}
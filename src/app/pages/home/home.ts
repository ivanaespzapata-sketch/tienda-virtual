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
  maxPrice: number = 300;
  sortOrder: string = 'default';

  // Categorías completas solicitadas
  categoriesList: string[] = ['Todas', 'Aretes', 'Collares', 'Anillos', 'Pulseras', 'Charms'];

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

    // Nos suscribimos al carrito para mantener actualizado el estado en tiempo real
    this.cartSub = this.shopService.cart$.subscribe(items => {
      this.currentCartItems = items;
    });

    // Escucha la búsqueda enviada desde la lupa en el Header
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
    this.filteredProducts = this.products.filter(product => {
      const query = this.searchQuery.toLowerCase().trim();

      // Busca coincidencia en el título O en la categoría
      const matchesSearch = product.title.toLowerCase().includes(query) ||
                            product.category.toLowerCase().includes(query);

      const matchesCategory = this.selectedCategory === 'Todas' || 
                            product.category.toLowerCase() === this.selectedCategory.toLowerCase();
                            
      const matchesPrice = product.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (this.sortOrder === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  // Alias por si el HTML u otro componente invoca addToCart
  addToCart(product: Product): void {
    this.toggleCart(product);
  }

  // Alterna agregar o eliminar del carrito y dispara el mensaje correspondiente
  toggleCart(product: Product): void {
    const isAdded = this.shopService.toggleCart(product);

    if (isAdded) {
      this.showToast('Producto añadido', 'success');
    } else {
      this.showToast('Producto eliminado', 'danger');
    }
  }

  // Verifica si el producto ya está en el carrito de forma reactiva
  isInCart(productId: number): boolean {
    return this.currentCartItems.some(item => item.product.id === productId);
  }

  // Maneja la visibilidad de la alerta flotante
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

  // Métodos para la Vista Previa Rápida
  openQuickView(product: Product): void {
    this.selectedProduct = product;
  }

  closeQuickView(): void {
    this.selectedProduct = null;
  }
}
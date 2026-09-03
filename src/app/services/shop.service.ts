// src/app/services/shop.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, CartItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private storageKey = 'my_shop_cart_items';
  private wishlistKey = 'my_shop_wishlist_ids';
  private userKey = 'my_shop_current_user';

  private products: Product[] = [
    {
      id: 1,
      title: 'Anillo de Diamante Elegance',
      price: 150,
      category: 'Anillos',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      description: 'Hermoso anillo de oro con incrustación de diamante selecto.',
      rating: 5,
      reviewsCount: 12
    },
    {
      id: 2,
      title: 'Collar de Perla Clásicos',
      price: 85,
      category: 'Collares',
      image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400',
      description: 'Aretes finos de perla cultivada ideales para ocasiones especiales.',
      rating: 4.8,
      reviewsCount: 8
    },
    {
      id: 3,
      title: 'Collar de Oro Rose',
      price: 220,
      category: 'Collares',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      description: 'Collar delicado acabado en oro rose de alta durabilidad.',
      rating: 5,
      reviewsCount: 15
    },
    {
      id: 4,
      title: 'Pulsera de Plata Minimalista',
      price: 95,
      category: 'Pulseras',
      image: "https://images.unsplash.com/photo-1611591475871-2ee3a6542152?auto=format&fit=crop&w=600&q=80",
      description: 'Pulsera de plata esterlina con diseño moderno y minimalista.',
      rating: 4.6,
      reviewsCount: 9
    },
    {
      id: 5,
      title: 'Charm Corazón Brillante',
      price: 45,
      category: 'Charms',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
      description: 'Charm colgante en forma de corazón con detalles circonita.',
      rating: 4.9,
      reviewsCount: 20
    }
  ];

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  private wishlistSubject = new BehaviorSubject<number[]>(this.loadWishlistFromStorage());
  public wishlist$: Observable<number[]> = this.wishlistSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(this.loadUserFromStorage());
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // --- CARRITO ---
  private loadCartFromStorage(): CartItem[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      // IMPORTANTE: Emitimos el nuevo valor para que el header lo detecte al instante
      this.cartSubject.next([...items]); 
    } catch (e) {
      console.error('Error al guardar el carrito', e);
    }
  }

toggleCart(product: Product): boolean {
    const currentItems = [...this.cartSubject.value];
    const index = currentItems.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      currentItems.splice(index, 1);
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    
    // Guardamos y emitimos de forma explícita el nuevo arreglo
    this.saveCartToStorage(currentItems);
    return index === -1; // Retorna true si se agregó, false si se quitó
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = [...this.cartSubject.value];
    const item = currentItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCartToStorage(currentItems);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartSubject.value.filter(i => i.product.id !== productId);
    this.saveCartToStorage(currentItems);
  }

  // --- FAVORITOS ---
  private loadWishlistFromStorage(): number[] {
    try {
      const saved = localStorage.getItem(this.wishlistKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  private saveWishlistToStorage(ids: number[]): void {
    try {
      localStorage.setItem(this.wishlistKey, JSON.stringify(ids));
      this.wishlistSubject.next(ids);
    } catch (e) {}
  }

  toggleWishlist(productId: number): void {
    const current = [...this.wishlistSubject.value];
    const index = current.indexOf(productId);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(productId);
    }
    this.saveWishlistToStorage(current);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistSubject.value.includes(productId);
  }

  // --- AUTENTICACIÓN Y USUARIO ---
  private loadUserFromStorage(): any {
    try {
      const saved = localStorage.getItem(this.userKey);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  login(email: string, pass: string): boolean {
    // Simulación de inicio de sesión exitoso
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
    return true;
  }

  register(userData: { name: string; email: string; pass?: string }): boolean {
    const user = { email: userData.email, name: userData.name };
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
}
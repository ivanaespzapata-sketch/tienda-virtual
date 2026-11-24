// src/app/services/shop.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, CartItem } from '../models';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private storageKey = 'my_shop_cart_items';
  private wishlistKey = 'my_shop_wishlist_ids';

  private products: Product[] = [
    // --- ANILLOS (5) ---
    {
      id: 1,
      title: 'Anillo Banda Infinita',
      price: 690,
      category: 'Anillos',
      image: 'productos/anillo-1.png',
      description: 'Anillo de perfil delgado y cómodo para uso continuo con acabado pulido.',
      rating: 4.9,
      reviewsCount: 14
    },
    {
      id: 2,
      title: 'Anillo Halo Radiante',
      price: 940,
      category: 'Anillos',
      image: 'productos/anillo-2.png',
      description: 'Detalle central rodeado de micro-detalles luminosos para ocasiones especiales.',
      rating: 5,
      reviewsCount: 19
    },
    {
      id: 3,
      title: 'Anillo Doble Aro',
      price: 720,
      category: 'Anillos',
      image: 'productos/anillo-3.png',
      description: 'Diseño moderno de doble línea con brillo uniforme y ajuste cómodo.',
      rating: 4.7,
      reviewsCount: 11
    },
    {
      id: 4,
      title: 'Anillo Solitario Serena',
      price: 1120,
      category: 'Anillos',
      image: 'productos/anillo-4.png',
      description: 'Piedra central clásica sobre banda fina y elegante de alta presencia.',
      rating: 5,
      reviewsCount: 23
    },
    {
      id: 5,
      title: 'Anillo Ondas Doradas',
      price: 610,
      category: 'Anillos',
      image: 'productos/anillo-5.png',
      description: 'Silueta orgánica con textura suave ideal para combinar con otras piezas.',
      rating: 4.8,
      reviewsCount: 9
    },

    // --- ARETES (5) ---
    {
      id: 6,
      title: 'Arracadas Huggie Clásicas',
      price: 640,
      category: 'Aretes',
      image: 'productos/aretes-1.png',
      description: 'Arracadas pequeñas de cierre práctico y cómodo para uso diario.',
      rating: 4.9,
      reviewsCount: 17
    },
    {
      id: 7,
      title: 'Broqueles Punto de Luz',
      price: 520,
      category: 'Aretes',
      image: 'productos/aretes-2.png',
      description: 'Broqueles discretos con piedra central brillante de estilo atemporal.',
      rating: 4.8,
      reviewsCount: 21
    },
    {
      id: 8,
      title: 'Arracadas Trenzadas',
      price: 780,
      category: 'Aretes',
      image: 'productos/aretes-3.png',
      description: 'Arracadas de textura trenzada con brillo uniforme y cierre seguro.',
      rating: 4.7,
      reviewsCount: 12
    },
    {
      id: 9,
      title: 'Aretes Gota Elegante',
      price: 860,
      category: 'Aretes',
      image: 'productos/aretes-4.png',
      description: 'Diseño alargado con caída ligera ideal para eventos o realzar looks.',
      rating: 4.9,
      reviewsCount: 15
    },
    {
      id: 10,
      title: 'Broqueles Flor Satinada',
      price: 590,
      category: 'Aretes',
      image: 'productos/aretes-5.png',
      description: 'Broqueles con motivo floral y acabado satinado delicado.',
      rating: 4.6,
      reviewsCount: 8
    },

    // --- CHARMS (5) ---
    {
      id: 11,
      title: 'Charm Estrella Fugaz',
      price: 450,
      category: 'Charms',
      image: 'productos/charm-1.png',
      description: 'Dije compacto con forma de estrella para pulsera o collar.',
      rating: 4.8,
      reviewsCount: 16
    },
    {
      id: 12,
      title: 'Charm Corazón Brillante',
      price: 490,
      category: 'Charms',
      image: 'productos/charm-2.png',
      description: 'Detalle en forma de corazón con acabado luminoso para regalo.',
      rating: 5,
      reviewsCount: 24
    },
    {
      id: 13,
      title: 'Charm Luna Creciente',
      price: 530,
      category: 'Charms',
      image: 'productos/charm-3.png',
      description: 'Dije de media luna con trazo delicado y elegante.',
      rating: 4.9,
      reviewsCount: 13
    },
    {
      id: 14,
      title: 'Charm Trébol de Suerte',
      price: 560,
      category: 'Charms',
      image: 'productos/charm-4.png',
      description: 'Dije simbólico ideal para obsequio o acompañarte todos los días.',
      rating: 4.8,
      reviewsCount: 11
    },
    {
      id: 15,
      title: 'Charm Perla Colgante',
      price: 610,
      category: 'Charms',
      image: 'productos/charm-5.png',
      description: 'Pequeña perla colgante con argolla de sujeción segura.',
      rating: 4.7,
      reviewsCount: 10
    },

    // --- COLLARES (5) ---
    {
      id: 16,
      title: 'Collar Solitaire Dorado',
      price: 890,
      category: 'Collares',
      image: 'productos/collar-1.png',
      description: 'Collar fino con dije central brillante para uso diario o regalo.',
      rating: 5,
      reviewsCount: 22
    },
    {
      id: 17,
      title: 'Gargantilla Ondas de Luz',
      price: 750,
      category: 'Collares',
      image: 'productos/collar-2.png',
      description: 'Gargantilla de acabado liso y estilizado con caída suave.',
      rating: 4.8,
      reviewsCount: 14
    },
    {
      id: 18,
      title: 'Collar Corazón Entrelazado',
      price: 980,
      category: 'Collares',
      image: 'productos/collar-3.png',
      description: 'Dije doble con acabado pulido ideal para ocasiones especiales.',
      rating: 4.9,
      reviewsCount: 18
    },
    {
      id: 19,
      title: 'Collar Perla Clásica',
      price: 820,
      category: 'Collares',
      image: 'productos/collar-4.png',
      description: 'Cadena fina con detalle tipo perla de brillo elegante.',
      rating: 4.8,
      reviewsCount: 12
    },
    {
      id: 20,
      title: 'Collar Medallón Aurelle',
      price: 1150,
      category: 'Collares',
      image: 'productos/collar-5.png',
      description: 'Medallón circular con borde texturizado y presencia clásica.',
      rating: 5,
      reviewsCount: 16
    },

    // --- PULSERAS (5) ---
    {
      id: 21,
      title: 'Pulsera Esclava Rígida',
      price: 1050,
      category: 'Pulseras',
      image: 'productos/pulsera-1.png',
      description: 'Pulsera rígida de línea limpia con cierre discreto y firme.',
      rating: 4.9,
      reviewsCount: 15
    },
    {
      id: 22,
      title: 'Pulsera Cadena Eslabón',
      price: 890,
      category: 'Pulseras',
      image: 'productos/pulsera-2.png',
      description: 'Pulsera de eslabones articulados con broche seguro y cómodo.',
      rating: 4.8,
      reviewsCount: 13
    },
    {
      id: 23,
      title: 'Pulsera Hilo Brillante',
      price: 670,
      category: 'Pulseras',
      image: 'productos/pulsera-3.png',
      description: 'Diseño ligero y delicado con ajuste cómodo en muñeca.',
      rating: 4.7,
      reviewsCount: 9
    },
    {
      id: 24,
      title: 'Pulsera Perlas Aurelle',
      price: 920,
      category: 'Pulseras',
      image: 'productos/pulsera-4.png',
      description: 'Combinación de perlas sutiles con broche clásico elegante.',
      rating: 4.9,
      reviewsCount: 11
    },
    {
      id: 25,
      title: 'Pulsera Rígida Texturizada',
      price: 1190,
      category: 'Pulseras',
      image: 'productos/pulsera-5.png',
      description: 'Brazalete con acabado texturizado para lucir sola o acompañada.',
      rating: 5,
      reviewsCount: 17
    }
  ];

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  private wishlistSubject = new BehaviorSubject<number[]>(this.loadWishlistFromStorage());
  public wishlist$: Observable<number[]> = this.wishlistSubject.asObservable();

public currentUser$: Observable<any>;

    constructor(private authService: AuthService) {
  this.currentUser$ = authService.currentUser$;
}

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

    this.saveCartToStorage(currentItems);
    return index === -1;
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

  login(email: string, pass: string): Promise<boolean> {
    return this.authService.login(email, pass);
  }

  register(userData: {
    name: string;
    email: string;
    pass?: string
  }): Promise<boolean> {
    return this.authService.register({
      name: userData.name,
      email: userData.email,
      password: userData.pass
    });
  }

  logout(): void {
    this.authService.logout().catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}

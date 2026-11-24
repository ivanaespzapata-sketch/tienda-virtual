import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { CartItem } from '../../models';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart-checkout.html',
  styleUrl: './cart-checkout.css'
})
export class CartCheckout implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  shippingCost = 0;
  postalCode = '';
  shippingCalculated = false;
  taxRate = 0.16;
  taxAmount = 0;
  total = 0;

  // Variables para el sistema de cupones
  couponCode = '';
  discountAmount = 0;
  couponApplied = false;
  couponMessage = '';
  couponError = false;

  // Variables de método de pago y procesamiento
  paymentMethod = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  isProcessing = false;

  // Estado del flujo de compra (Thank You Page)
  isCompleted = false;
  orderNumber = '';
  customerName = '';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateShipping(): void {
    if (this.postalCode.trim().length >= 4) {
      const cpNum = parseInt(this.postalCode, 10);
      this.shippingCost = (cpNum % 2 === 0) ? 12.00 : 18.50;
      this.shippingCalculated = true;
      this.calculateTotals();
    }
  }

  applyCoupon(): void {
    const code = this.couponCode.trim().toUpperCase();
    if (code === 'PROFE100') {
      this.couponApplied = true;
      this.couponError = false;
      this.couponMessage = '¡Cupón PROFE100 aplicado (100% de descuento)!';
      this.calculateTotals();
    } else if (code === 'VALENY') {
      this.couponApplied = true;
      this.couponError = false;
      this.couponMessage = '¡Cupón VALENY aplicado (10% de descuento)!';
      this.calculateTotals();
    } else {
      this.couponApplied = false;
      this.couponError = true;
      this.couponMessage = 'Cupón inválido o expirado.';
      this.calculateTotals();
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    this.shopService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.shopService.removeFromCart(productId);
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const code = this.couponCode.trim().toUpperCase();
    if (this.couponApplied) {
      if (code === 'PROFE100') {
        this.discountAmount = this.subtotal;
      } else if (code === 'VALENY') {
        this.discountAmount = this.subtotal * 0.10;
      } else {
        this.discountAmount = 0;
      }
    } else {
      this.discountAmount = 0;
    }

    const discountedSubtotal = Math.max(0, this.subtotal - this.discountAmount);
    this.taxAmount = discountedSubtotal * this.taxRate;
    this.total = this.subtotal > 0 ? (discountedSubtotal + this.shippingCost + this.taxAmount) : 0;
  }

  processOrder(formValue: any): void {
    if (this.cartItems.length === 0 || this.isProcessing) return;

    this.isProcessing = true;
    this.customerName = formValue.name || 'Cliente';
    this.paymentMethod = formValue.paymentMethod || this.paymentMethod || 'Tarjeta de Crédito / Débito';

    setTimeout(() => {
      this.orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

      this.cartItems.forEach(item => {
        this.shopService.removeFromCart(item.product.id);
      });

      this.isProcessing = false;
      this.isCompleted = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }
}
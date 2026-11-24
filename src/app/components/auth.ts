
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container" style="max-width: 400px; margin: 40px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h2>{{ isLoginMode ? 'Iniciar Sesión' : 'Registrarse' }}</h2>

      <form (ngSubmit)="onSubmit()">
        <div *ngIf="!isLoginMode" style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Nombre:</label>
          <input type="text" [(ngModel)]="name" name="name" style="width: 100%; padding: 8px;" required>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Correo electrónico:</label>
          <input type="email" [(ngModel)]="email" name="email" style="width: 100%; padding: 8px;" required>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Contraseña:</label>
          <input type="password" [(ngModel)]="pass" name="pass" style="width: 100%; padding: 8px;" required>
        </div>

        <p *ngIf="errorMessage" style="color: red; font-size: 14px;">{{ errorMessage }}</p>

        <button type="submit" [disabled]="isLoading" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          {{ isLoading ? 'Procesando...' : (isLoginMode ? 'Entrar' : 'Registrarme') }}
        </button>
      </form>

      <p style="text-align: center; margin-top: 15px; font-size: 14px;">
        <span *ngIf="isLoginMode">¿No tienes cuenta? </span>
        <span *ngIf="!isLoginMode">¿Ya tienes cuenta? </span>
        <a href="#" (click)="isLoginMode = !isLoginMode; errorMessage = ''; $event.preventDefault()" style="color: blue; text-decoration: underline;">
          {{ isLoginMode ? 'Regístrate aquí' : 'Inicia sesión' }}
        </a>
      </p>
    </div>
  `
})
export class AuthComponent {
  isLoginMode: boolean = true;
  name: string = '';
  email: string = '';
  pass: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private shopService: ShopService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    this.errorMessage = '';

    if (this.isLoading) {
      return;
    }

    if (!this.email.trim() || !this.pass) {
      this.errorMessage = 'Completa todos los campos.';
      return;
    }

    if (!this.isLoginMode && !this.name.trim()) {
      this.errorMessage = 'Por favor ingresa tu nombre.';
      return;
    }

    if (!this.isLoginMode && this.pass.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.isLoading = true;

    try {
      if (this.isLoginMode) {
        const success = await this.shopService.login(
          this.email,
          this.pass
        );

        if (success) {
          await this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        }

      } else {
        const success = await this.shopService.register({
          name: this.name,
          email: this.email,
          pass: this.pass
        });

        if (success) {
          await this.router.navigate(['/']);
        } else {
          this.errorMessage = 'No se pudo completar el registro.';
        }
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      this.errorMessage = 'Ocurrió un error. Intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }
}

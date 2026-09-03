import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  showRedirectMessage = false;
  errorMessage = '';

  constructor(private shopService: ShopService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }
    
    const success = this.shopService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Credenciales incorrectas.';
    }
  }
}
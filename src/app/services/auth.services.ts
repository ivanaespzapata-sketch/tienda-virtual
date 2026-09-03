// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'active_user';
  private usersKey = 'registered_users';

  constructor(private router: Router) {}

  register(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const exists = users.find(u => u.email === user.email);
    
    if (exists) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setCurrentUser({ name: user.name, email: user.email });
    return true;
  }

  login(email: string, pass: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(u => u.email === email && u.password === pass);
    
    if (user) {
      this.setCurrentUser({ name: user.name, email: user.email });
      return true;
    }
    return false;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }
}
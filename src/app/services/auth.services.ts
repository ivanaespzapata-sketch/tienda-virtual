
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase.config';

export interface User {
  name: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.subject.asObservable();

  constructor(private zone: NgZone) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('registered_users');
      localStorage.removeItem('active_user');
      localStorage.removeItem('my_shop_current_user');
    }

    onAuthStateChanged(auth, user => {
      this.zone.run(() => {
        this.subject.next(user ? {
          name: user.displayName || user.email?.split('@')[0] || '',
          email: user.email || ''
        } : null);
      });
    });
  }

  private async saveProfile(
    uid: string,
    name: string,
    email: string
  ) {
    const ref = doc(db, 'usuarios', uid);

    if (!(await getDoc(ref)).exists()) {
      await setDoc(ref, {
        nombre: name,
        correo: email,
        rol: 'cliente',
        fechaRegistro: serverTimestamp()
      });
    }
  }

  async register(user: User): Promise<boolean> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        user.email.trim(),
        user.password || ''
      );

      await updateProfile(result.user, {
        displayName: user.name.trim()
      });

      await this.saveProfile(
        result.user.uid,
        user.name.trim(),
        result.user.email || user.email
      );

      this.subject.next({
        name: user.name.trim(),
        email: result.user.email || user.email
      });

      return true;

    } catch (error) {
      console.error('Error de registro:', error);
      return false;
    }
  }

  async login(email: string, pass: string): Promise<boolean> {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        pass
      );

      const name = result.user.displayName || email.split('@')[0];

      await this.saveProfile(
        result.user.uid,
        name,
        result.user.email || email
      );

      this.subject.next({
        name,
        email: result.user.email || email
      });

      return true;

    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      return false;
    }
  }

  getCurrentUser(): User | null {
    return this.subject.value;
  }

  isLoggedIn(): boolean {
    return auth.currentUser !== null;
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.subject.next(null);
  }
}

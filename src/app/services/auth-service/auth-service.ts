import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

export interface UserInfo {
  email: string;
  password: string;
}

export interface User extends UserInfo {
  id: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser extends User {
  isAuthenticated: boolean;
}

export interface UserSession {
  sessionId: string;
  expireAt: number;
  user: Omit<AuthenticatedUser, 'password'>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SESSION_DURATION: number = 1;

  constructor(private router: Router) {}

  registerUser(user: UserInfo): User | string {
    try {
      const { email, password } = user;
      if (localStorage.getItem(email) !== null) throw new Error('Usuário já registrado');
      const newUser = { id: uuidv4(), email, password: this.hashPassword(password) };
      localStorage.setItem(user.email, JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  signIn(userCredentials: UserInfo): UserSession | string {
    sessionStorage.clear();
    try {
      const { password } = userCredentials;
      const userFromStorage = localStorage.getItem(userCredentials.email);
      if (!userFromStorage) throw new Error('Credenciais incorretas');

      const user: User = JSON.parse(userFromStorage);
      if (!this.verifyPassword(password, user.password))
        throw new Error('Credenciais incorretas');

      return this.generateSession(user);
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  private generateSession(user: User): UserSession | string {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + this.SESSION_DURATION);
      const session = {
        sessionId: uuidv4(),
        expireAt: currentDate.getTime(),
        user: { id: user.id, email: user.email, isAuthenticated: true }
      };

      sessionStorage.setItem(session.user.id, JSON.stringify(session));
      this.router.navigate(['/']);
      return session;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  getUserSession(): UserSession | string {
    try {
      const userId = sessionStorage.key(0);
      if (!userId) throw new Error('Sessão de usuário não encontrada');

      const sessionItem = sessionStorage.getItem(userId);
      if (sessionItem) {
        const session: UserSession = JSON.parse(sessionItem);
        if (Date.now() > session.expireAt) throw new Error('Sessão de usuário expirada')
        return session
      }

      throw new Error('Sessão de usuário não encontrada');
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  isAuthenticated(): boolean {
    if (typeof this.getUserSession() === 'string') return false;
    return true;
  }

  verifyPassword(typedPassword: string, password: string): boolean {
    return this.hashPassword(typedPassword) === password;
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }
}

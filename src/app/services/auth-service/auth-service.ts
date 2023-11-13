import { Injectable } from '@angular/core';
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

  signOut(userId: string): void {
    localStorage.removeItem(userId);
  }

  private generateSession(user: User): UserSession | string {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      const session = {
        sessionId: uuidv4(),
        expireAt: currentDate.getTime(),
        user: { id: user.id, email: user.email, isAuthenticated: true }
      };
      localStorage.setItem(session.user.id, JSON.stringify(session))
      return session;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  getUserSession(userId: string): UserSession | string {
    try {
      const sessionItem = localStorage.getItem(userId);
      if (!sessionItem) throw new Error('Sessão de usuário não encontrada');

      const session: UserSession = JSON.parse(sessionItem);
      if (Date.now() > session.expireAt) throw new Error('Sessão de usuário expirada')
      return session
    } catch (error) {
      if (error instanceof Error) return error.message;
      return String(error);
    }
  }

  isAuthenticated(userId: string): boolean {
    const session = this.getUserSession(userId);
    return typeof session === 'string' ? false : Boolean(session.user.isAuthenticated);
  }

  verifyPassword(typedPassword: string, password: string): boolean {
    return this.hashPassword(typedPassword) === password;
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }
}

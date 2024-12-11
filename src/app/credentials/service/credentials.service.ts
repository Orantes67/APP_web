import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserI } from '../interface/user';
import { CredentialsI } from '../interface/credentials';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private readonly usersKey = 'users';
  private readonly tokenKey = 'authToken';

  constructor() {}

  registerUser(user: UserI): Observable<boolean> {
    const users = this.getUsers();
    const exists = users.some(u => u.correo_id === user.correo_id);

    if (exists) {
      return of(false); 
    }

    users.push(user);
    this.saveUsers(users);
    return of(true);
  }

  loginUser(credentials: CredentialsI): Observable<boolean> {
    const users = this.getUsers();
    const user = users.find(
      u =>
        u.correo_id === credentials.correo_id &&
        u.contrasena_id === credentials.contrasena_id
    );

    if (user) {
      this.setToken(`${user.correo_id}-${Date.now()}`);
      return of(true);
    }

    return of(false); 
  }

  private getUsers(): UserI[] {
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: UserI[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

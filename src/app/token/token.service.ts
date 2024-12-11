import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'auth_token';

  saveToken(token: string): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.error('Intento de guardar un token vacío');
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token ? token : null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Agregar método para obtener usuario
  // TokenService
getUserNameFromToken(): string | null {
  const token = this.getToken();
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
    return decodedToken.username || null; // Asegúrate de que el token incluye el campo 'username'
  }
  return null;
}

  
}

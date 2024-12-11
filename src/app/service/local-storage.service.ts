import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en el LocalStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) {
      console.warn('No se encontró el ítem con la clave: ${key}');
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error al parsear el ítem del LocalStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
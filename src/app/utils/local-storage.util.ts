import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageUtil {
  setItem<T>(key: string, value: T): void {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, toStore);
  }

  getItem<T>(key: string): T | string | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item; 
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

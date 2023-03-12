import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}
  setData<T>(key: string, data: T) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  deleteData(key: string) {
    sessionStorage.removeItem(key);
  }
  getData<T>(key: string, ifNull: T): T {
    const item = sessionStorage.getItem(key);
    if (item == null) {
      return ifNull;
    } else {
      return JSON.parse(item);
    }
  }
}

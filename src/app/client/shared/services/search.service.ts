import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private value$ = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('search') as string) || ''
  );
  constructor() {}
  getValue() {
    return this.value$.asObservable();
  }
  setValue(value: string) {
    this.value$.next(value);
  }
}

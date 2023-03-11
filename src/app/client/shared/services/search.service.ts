import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  value$ = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('search') as string) || ''
  );
  constructor() {}
  setValue(value: string) {
    this.value$.next(value);
  }
}

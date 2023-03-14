import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private value$ = new BehaviorSubject<string>(
    this.sessionStorageService.getData<string>('search', '')
  );
  constructor(private sessionStorageService: SessionStorageService) {}
  getValue() {
    return this.value$.asObservable();
  }
  setValue(value: string) {
    this.value$.next(value);
  }
}

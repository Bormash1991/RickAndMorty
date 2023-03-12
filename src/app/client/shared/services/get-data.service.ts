import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private API_PATH = 'https://rickandmortyapi.com/api/character/';
  constructor(private http: HttpClient) {}
  getAllcharacters<T>(): Observable<T> {
    return this.http.get<T>(this.API_PATH);
  }
  getCharacter<T>(id: string): Observable<T> {
    return this.http.get<T>(this.API_PATH + id);
  }
}

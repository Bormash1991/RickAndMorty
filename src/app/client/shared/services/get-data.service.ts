import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private API_PATH = 'https://rickandmortyapi.com/api/character/';
  constructor(private http: HttpClient) {}
  getAllcharacters() {
    return this.http.get(this.API_PATH);
  }
  getCharacter(id: string) {
    return this.http.get(this.API_PATH + id);
  }
}

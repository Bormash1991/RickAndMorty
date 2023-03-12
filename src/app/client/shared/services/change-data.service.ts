import { Injectable } from '@angular/core';
import { TypeOfCharacter } from 'src/models/TypeOfCharacter.interface';
import { TypeOfPaginatorEvent } from 'src/models/TypeOfPaginatorEvent.interface';
import { SessionStorageService } from './session-storage.service';
import { TypeOfFindDataReturn } from 'src/models/TypeOfFindDataReturn.interface';
import { TypeOfChangePageReturn } from 'src/models/TypeOfChangePageReturn.interface';

@Injectable({
  providedIn: 'root',
})
export class ChangeDataService {
  private characters: TypeOfCharacter[] = [];
  private stateCharacters: TypeOfCharacter[] = [];
  private charactersAfterFilter: TypeOfCharacter[] = [];
  private charactersLength: number = 0;
  private pageIndex: number = this.sessionStorageService.getData<number>(
    'pageIndex',
    0
  );
  private num: number = 0;
  private check: boolean = true;
  constructor(private sessionStorageService: SessionStorageService) {}
  setData(data: TypeOfCharacter[], num: number): TypeOfCharacter[] {
    data.sort(this.byField('name'));
    this.characters = data;
    this.stateCharacters = [...data];
    this.charactersAfterFilter = [...data];
    this.charactersLength = data.length;
    this.num = num;
    this.firstPage();
    return this.characters;
  }
  findData(param: string): TypeOfFindDataReturn {
    if (param) {
      this.characters = this.stateCharacters.filter(
        (character: TypeOfCharacter) =>
          character.name.toLowerCase().search(param.toLowerCase()) >= 0
      );
    } else {
      this.characters = this.stateCharacters;
    }
    if (this.check) {
      this.check = false;
    } else {
      this.pageIndex = 0;
    }
    this.charactersAfterFilter = [...this.characters];
    this.charactersLength = this.characters.length;
    this.firstPage();
    this.sessionStorageService.setData<number>('pageIndex', this.pageIndex);
    return {
      charecters: this.characters,
      charactersLength: this.charactersLength,
      pageIndex: this.pageIndex,
    };
  }
  changePage(event: TypeOfPaginatorEvent): TypeOfChangePageReturn {
    let index = event.pageIndex;
    let lastIndex = event.previousPageIndex;
    if (index > lastIndex) {
      this.characters = this.charactersAfterFilter.slice(
        (lastIndex + 1) * this.num,
        (index + 1) * this.num
      );
      this.pageIndex++;
    }
    if (index < lastIndex) {
      this.characters = this.charactersAfterFilter.slice(
        index * this.num,
        lastIndex * this.num
      );
      this.pageIndex--;
    }
    this.sessionStorageService.setData<number>('pageIndex', this.pageIndex);
    return {
      charecters: this.characters,
      pageIndex: this.pageIndex,
    };
  }
  private firstPage() {
    this.characters = this.charactersAfterFilter.slice(
      this.pageIndex * this.num,
      (this.pageIndex + 1) * this.num
    );
  }

  private byField(field: string) {
    return (a: any, b: any) =>
      a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1;
  }
  changeCheck() {
    this.check = true;
  }
}

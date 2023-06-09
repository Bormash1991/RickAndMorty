import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from '../shared/services/get-data.service';
import { BehaviorSubject, Subscription, delay } from 'rxjs';
import { ChangeDataService } from '../shared/services/change-data.service';
import { SearchService } from '../shared/services/search.service';
import { TypeOfResponseAll } from 'src/models/TypeOfResponseAll.interface';
import { TypeOfCharacter } from 'src/models/TypeOfCharacter.interface';
import { TypeOfPaginatorEvent } from 'src/models/TypeOfPaginatorEvent.interface';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  protected characters: TypeOfCharacter[] = [];
  protected charactersLength: number = 0;
  protected pageIndex: number = 0;
  protected num: number = 8;
  protected loading$ = new BehaviorSubject<boolean>(true);
  private searchSubj!: Subscription;
  constructor(
    private getDataService: GetDataService,
    private changeDataService: ChangeDataService,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.getDataService
      .getAllcharacters<TypeOfResponseAll>()
      .pipe(delay(500))
      .subscribe((data) => {
        if (data.results) {
          this.changeDataService.setData(data.results, this.num);
          this.charactersLength = data.results.length;
          this.loading$.next(false);
          this.searchSubj = this.searchService
            .getValue()
            .subscribe((value: string) => {
              this.changeData(value);
            });
        }
      });
  }
  protected changeData(param: string) {
    const { charecters, charactersLength, pageIndex } =
      this.changeDataService.findData(param);
    this.characters = charecters;
    this.charactersLength = charactersLength;
    this.pageIndex = pageIndex;
  }

  protected changePage(event: TypeOfPaginatorEvent) {
    const { charecters, pageIndex } = this.changeDataService.changePage(event);
    this.characters = charecters;
    this.pageIndex = pageIndex;
  }
  ngOnDestroy() {
    this.changeDataService.changeCheck();
    this.searchSubj.unsubscribe();
  }
}

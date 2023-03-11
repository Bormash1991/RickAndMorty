import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GetDataService } from '../shared/services/get-data.service';
import { BehaviorSubject, delay } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';
import { ChangeDataService } from '../shared/services/change-data.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  charactersLength: number = 0;
  pageIndex: number = 0;
  num: number = 8;
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(
    private getDataService: GetDataService,
    private changeDataService: ChangeDataService,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.getDataService
      .getAllcharacters()
      .pipe(delay(500))
      .subscribe((data: any) => {
        if (data.results) {
          this.characters = this.changeDataService.setData(
            data.results,
            this.num
          );
          this.charactersLength = data.results.length;
          this.loading$.next(false);
          this.searchService.value$.subscribe((value: string) => {
            this.changeData(value);
          });
        }
      });
  }
  changeData(param: string) {
    let arr = this.changeDataService.findData(param);
    this.characters = arr[0] as any[];
    this.charactersLength = arr[1] as number;
    this.pageIndex = arr[2] as number;
  }

  changePage(event: any) {
    let arr = this.changeDataService.changePage(event);
    this.characters = arr[0] as any[];
    this.pageIndex = arr[1] as number;
  }
  ngOnDestroy(): void {
    this.changeDataService.changeCheck();
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';
import { SearchService } from '../shared/services/search.service';
import { SessionStorageService } from '../shared/services/session-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('search') searchInput!: ElementRef;
  protected value: string = this.sessionStorageService.getData<string>(
    'search',
    ''
  );
  constructor(
    private searchService: SearchService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(1000),
        map((event: any) => event.target.value)
      )
      .subscribe((data: string) => {
        this.searchService.setValue(data);
        this.sessionStorageService.setData<string>('search', data);
      });
  }
}

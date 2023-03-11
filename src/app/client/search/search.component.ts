import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnInit {
  @ViewChild('search') searchInput!: ElementRef;
  value: string = '';
  constructor(private searchService: SearchService) {}
  ngOnInit() {
    this.value = JSON.parse(sessionStorage.getItem('search') as string);
  }
  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(1000),
        map((event: any) => event.target.value)
      )
      .subscribe((data: string) => {
        this.searchService.setValue(data);
        sessionStorage.setItem('search', JSON.stringify(data));
      });
  }
}

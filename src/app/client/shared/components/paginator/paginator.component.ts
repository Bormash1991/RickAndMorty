import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TypeOfPaginatorEvent } from 'src/models/TypeOfPaginatorEvent.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() pageIndex: number = 0;
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Output() page = new EventEmitter<TypeOfPaginatorEvent>();
  disableLeft: string = '';
  disableRight: string = '';
  label: string = '';
  ngOnInit(): void {}
  ngOnChanges() {
    if (this.pageIndex == 0) {
      this.disableLeft = 'disable';
    }
    this.changeLabel();
    this.checkDisable();
    if (this.length == 0) {
      this.disableLeft = 'disable';
      this.disableRight = 'disable';
      this.label = '0 of 0';
    } else if (this.length <= this.pageSize) {
      this.disableLeft = 'disable';
      this.disableRight = 'disable';
    }
  }
  changeLabel() {
    this.label = `${this.pageIndex + 1} of ${this.getTotalPages()}`;
  }
  checkDisable() {
    if (this.length > this.pageSize) {
      if (this.pageIndex == this.getTotalPages() - 1) {
        this.disableRight = 'disable';
      } else {
        this.disableRight = '';
      }
      if (this.pageIndex > 0) {
        this.disableLeft = '';
      } else {
        this.disableLeft = 'disable';
      }
    }
  }

  nextPage() {
    if (this.pageIndex < this.getTotalPages() - 1) {
      this.pageIndex++;
      this.page.emit({
        pageIndex: this.pageIndex,
        previousPageIndex: this.pageIndex - 1,
      });
      this.changeLabel();
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.page.emit({
        pageIndex: this.pageIndex,
        previousPageIndex: this.pageIndex + 1,
      });
    }
  }
  getTotalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }
}

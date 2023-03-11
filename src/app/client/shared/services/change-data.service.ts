import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeDataService {
  public products: any[] = [];
  private productsSecond: any[] = [];
  private allProductsAfterFilter: any[] = [];
  private productsLength: number = 0;
  private pageIndex: number =
    0 || JSON.parse(sessionStorage.getItem('pageIndex') as string);
  private num: number = 0;
  private check: boolean = true;
  constructor() {}
  setData(data: any[], num: number) {
    data = data.sort(this.byField('name'));
    this.products = data;
    this.productsSecond = [...data];
    this.allProductsAfterFilter = [...data];
    this.productsLength = data.length;
    this.num = num;
    this.firstPage();
    return this.products;
  }
  findData(param: string) {
    if (param) {
      this.products = this.productsSecond.filter(
        (character: any) =>
          character.name.toLowerCase().search(param.toLowerCase()) >= 0
      );
    } else {
      this.products = this.productsSecond;
    }
    if (this.check) {
      this.check = false;
    } else {
      this.pageIndex = 0;
    }
    this.allProductsAfterFilter = [...this.products];
    this.productsLength = this.products.length;
    this.firstPage();
    sessionStorage.setItem('pageIndex', JSON.stringify(this.pageIndex));
    return [this.products, this.productsLength, this.pageIndex];
  }
  changePage(event: any) {
    let index = event.pageIndex;
    let lastIndex = event.previousPageIndex;
    if (index > lastIndex) {
      this.products = this.allProductsAfterFilter.slice(
        (lastIndex + 1) * this.num,
        (index + 1) * this.num
      );
      this.pageIndex++;
    }
    if (index < lastIndex) {
      this.products = this.allProductsAfterFilter.slice(
        index * this.num,
        lastIndex * this.num
      );
      this.pageIndex--;
    }
    sessionStorage.setItem('pageIndex', JSON.stringify(this.pageIndex));
    return [this.products, this.pageIndex];
  }
  private firstPage() {
    this.products = this.allProductsAfterFilter.slice(
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

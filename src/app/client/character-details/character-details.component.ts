import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../shared/services/get-data.service';
import { BehaviorSubject, delay } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  character: any;
  labelForList = ['Gender', 'Status', 'Specie', 'Origin.name', 'Type'];
  dataForList: any[] = [];
  loading$ = new BehaviorSubject(true);
  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getDataService
      .getCharacter(id)
      .pipe(delay(500))
      .subscribe((data) => {
        if (data) {
          this.character = data;
          this.createList(data);
          this.loading$.next(false);
        }
      });
  }
  createList(data: any) {
    this.labelForList.forEach((label: string) => {
      let splitLabel: string[] = label.split('.');
      if (splitLabel.length > 1) {
        this.dataForList.push({
          title: splitLabel[0],
          subtitle:
            data[splitLabel[0].toLowerCase()][splitLabel[1].toLowerCase()],
        });
      } else {
        this.dataForList.push({
          title: label,
          subtitle: data[label.toLowerCase()]
            ? data[label.toLowerCase()]
            : 'unknown',
        });
      }
    });
  }
}

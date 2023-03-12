import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../shared/services/get-data.service';
import { BehaviorSubject, delay } from 'rxjs';
import { TypeOfCharacter } from 'src/models/TypeOfCharacter.interface';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  protected character!: TypeOfCharacter;
  protected loading$ = new BehaviorSubject(true);
  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.getDataService
      .getCharacter<TypeOfCharacter>(id)
      .pipe(delay(500))
      .subscribe((data) => {
        if (data) {
          this.character = data;
          this.loading$.next(false);
        }
      });
  }
}

import { Component, Input } from '@angular/core';
import { TypeOfCharacter } from 'src/models/TypeOfCharacter.interface';

@Component({
  selector: 'app-characters-item',
  templateUrl: './characters-item.component.html',
  styleUrls: ['./characters-item.component.scss'],
})
export class CharactersItemComponent {
  @Input() character!: TypeOfCharacter;
}

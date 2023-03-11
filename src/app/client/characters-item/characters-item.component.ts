import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-characters-item',
  templateUrl: './characters-item.component.html',
  styleUrls: ['./characters-item.component.scss'],
})
export class CharactersItemComponent {
  @Input() character: any;
}

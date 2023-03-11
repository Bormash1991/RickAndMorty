import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersItemComponent } from './characters-item/characters-item.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './search/search.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientComponent,
    CharactersListComponent,
    CharactersItemComponent,
    CharacterDetailsComponent,
    SearchComponent,
    PaginatorComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, MatPaginatorModule, FormsModule],
})
export class ClientModule {}

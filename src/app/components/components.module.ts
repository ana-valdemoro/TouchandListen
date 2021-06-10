import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input/password-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SongItemComponent } from './song-item/song-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const components = [
  PasswordInputComponent,
  PlaylistItemComponent,
  SongItemComponent,
  SearchBarComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [...components]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input/password-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SongItemComponent } from './song-item/song-item.component';

const components = [
  PasswordInputComponent,
  PlaylistItemComponent,
  SongItemComponent
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

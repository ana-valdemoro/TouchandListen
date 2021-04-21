import { Component, Input, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
})
export class SongItemComponent implements OnInit {
  @Input() song:ISong;
  constructor() { }

  ngOnInit() {}
  onAddPlaylist(){
    console.log("Hemos añadido a la playlist");
  }
}

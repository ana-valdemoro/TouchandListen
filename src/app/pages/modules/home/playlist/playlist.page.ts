import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISong } from 'src/app/models/song.model';
import { PlaylistProvider } from 'src/app/providers/playlist-provider';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlistObservable: Observable<any>;
  playlist:ISong[];
  constructor(private playlistProvider :  PlaylistProvider) { }

  ngOnInit() {
    this.playlistObservable = this.playlistProvider.getPlaylistObservable();
    this.playlistObservable.subscribe(songs =>this.playlist = songs );
  }
}

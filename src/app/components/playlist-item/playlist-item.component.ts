import { Component, Input, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { PlaylistProvider } from 'src/app/providers/playlist-provider';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() track: ISong;
  @Input() index:number;
  constructor(private playlistProvider : PlaylistProvider) { }
  thumbsUpToggleIcon:string="far";
  ngOnInit() {
    this.checkUserLike();
  }

  public formatTime(milisecs: number):string {
    let secs = Math.round(milisecs);
    var minutes = Math.floor( secs / 60) || 0;
    var seconds = (secs - (minutes * 60)) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  onlike(){
    
    if(this.thumbsUpToggleIcon == "far"){
      // this.thumbsUpToggleIcon = "fas";
      this.playlistProvider.addLikeToSong(this.track._id);
    }else{
      this.playlistProvider.deleteLikeToSong(this.track._id);
    }
  }
  checkUserLike(){
    let storagedUserUID = localStorage.getItem("currentUser");
    this.track.likes.includes(storagedUserUID) ? this.thumbsUpToggleIcon = "fas" : this.thumbsUpToggleIcon = "far"; ;
  }
}

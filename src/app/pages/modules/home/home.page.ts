import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { NavController } from '@ionic/angular';
import { PlaylistPage } from './playlist/playlist.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PlaylistProvider } from 'src/app/providers/playlist-provider';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentSong: ISong;
  currentSongIsLoaded:boolean  = false;
  playlist:ISong[];
  isPlaying:boolean = false;
  progress: number = 0;
  playlistObservable: Observable<any>;
  currentSongObservable : Observable<any>;

  ngOnInit() {
    this.currentSongObservable = this.playlistProvider.getPlayingSong();
    this.currentSongObservable.subscribe(song =>{
        //console.log(song);
        this.currentSong = song[0];
        if(song.length == 1){
          this.currentSongIsLoaded = true;
          this.progress = (this.currentSong.currentTime / this.currentSong.duration ) * 100 || 0;
        }
      });
      this.playlistObservable = this.playlistProvider.getPlaylistObservable();
      this.playlistObservable.subscribe(songs =>this.playlist = songs );

      
  }
  constructor(public navCtrl: NavController, private fireStore: FirestoreService, private playlistProvider :  PlaylistProvider) {}

  public formatTime(milisecs: number):string {
    let secs = Math.round(milisecs);
    var minutes = Math.floor( secs / 60) || 0;
    var seconds = (secs - (minutes * 60)) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  onViewEntirePlaylist(){
    this.navCtrl.navigateForward('tabs/home/playlist');
  }
 
}

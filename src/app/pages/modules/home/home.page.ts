import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { Howl } from 'howler';
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
  player:Howl = null;
  isPlaying:boolean = false;
  currentTime:string  = "0:00";
  progress: number = 0;
  duration:string = "0:00";
  playlistObservable: Observable<any>;
  currentSongObservable : Observable<any>;

  ngOnInit() {
    //Llamada a la playlist para que nos devuelva la canción actual a sonar
    this.currentSongObservable = this.playlistProvider.getPlayingSong();
    this.currentSongObservable.subscribe(song =>{
      if(song.length == 1){
        console.log(song);
        this.currentSong = song[0];
        this.currentSongIsLoaded = true;
      }
      });
      // then(song =>{
      //   this.currentSong = song[0];
      //   this.currentSongIsLoaded = true;
      // });
   
      //Configuramos el observable de canciones
      this.playlistObservable = this.playlistProvider.getPlaylistObservable();
      this.playlistObservable.subscribe(songs =>this.playlist = songs );

      
  }
  constructor(public navCtrl: NavController, private fireStore: FirestoreService, private playlistProvider :  PlaylistProvider) {}

  start(song: ISong){
    if(this.player){
      this.player.stop();
    }
    console.log("Hellou");
    this.player = new Howl({
      src:[song.path],
      html5:true,
      onplay:()=>{
        console.log("Sonando");
        this.duration = this.formatTime(this.player.duration());
        this.isPlaying = true;
        this.currentSong = song;
        this.updateProgress();
      },
      onend:()=>{
        console.log("Termino");
      }
    });
    this.player.play();
    // this.player.mute(true);
  }
  seek(){

  }
  public formatTime(milisecs: number):string {
    let secs = Math.round(milisecs);
    var minutes = Math.floor( secs / 60) || 0;
    var seconds = (secs - (minutes * 60)) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  private updateProgress(){
    let seek = this.player.seek(); //Obtenemos la posición actual
    this.currentTime = this.formatTime(seek);
    this.progress = (seek / this.player.duration()) * 100 || 0;
    // console.log(this.progress);
    if(this.player.playing()){
      setTimeout(()=>{
        this.updateProgress();
      }, 1000);
    } 
  }
  onViewEntirePlaylist(){
    this.navCtrl.navigateForward('tabs/home/playlist');
  }
 
}

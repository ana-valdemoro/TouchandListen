import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { Howl } from 'howler';
import { NavController } from '@ionic/angular';
import { PlaylistPage } from './playlist/playlist.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PlaylistProvider } from 'src/app/providers/playlist-provider';

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

  ngOnInit() {
    //Llamada al servicio de canciones para que nos de una canción a ver si funciona.
    this.fireStore.getSong("imQ5Js0wGj7IXzhrvf3V")
      .then(song =>{
        this.currentSong = song as ISong;
        this.currentSongIsLoaded = true;
        console.log(this.currentSong);
      });
   
      //Configuramos el observable de canciones
      this.playlistObservable = this.playlistProvider.getPlaylistObservable();
      this.playlistObservable.subscribe(songs =>this.playlist = songs );

      
  }
  constructor(public navCtrl: NavController, private fireStore: FirestoreService, private playlistProvider :  PlaylistProvider) {}


  // playlist:ISong[] =[ 
  //   {
  //     name: "Baila conmigoooooo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     likesCount: 1458
  //   },
  //   {
  //     name: "Bailaa conmigo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     likesCount: 2589

  //   },
  //   {
  //     name: "Bailaa conmigo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     likesCount: 2589

  //   },
  //   {
  //     name: "Bailaa conmigo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     likesCount: 2589

  //   }
  // ];


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

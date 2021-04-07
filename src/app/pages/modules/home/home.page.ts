import { Component } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { Howl } from 'howler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  currentSong: ISong ={
    name: "Baila conmigo",
    artists: ["Selena Gómez", "Rauw Alejandro"],
    duration: "3:04",
    photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large"
  } ;

  playlist:ISong[] =[ 
    {
      name: "Baila conmigoooooo",
      artists: ["Selena Gómez", "Rauw Alejandro"],
      duration: "3:04",
      photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
      path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
      timesPlaying: 1458
    },
    {
      name: "Bailaa conmigo",
      artists: ["Selena Gómez", "Rauw Alejandro"],
      duration: "3:04",
      photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
      path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
      timesPlaying: 2589

    }
  ];
  player:Howl = null;
  isPlaying:boolean = false;
  currentTime:string  = "0:00";
  progress: number = 0;
  duration:string = "0:00";

  start(song: ISong){
    if(this.player){
      this.player.stop();
    }
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
    console.log(this.progress);
    if(this.player.playing()){
      setTimeout(()=>{
        this.updateProgress();
      }, 1000);
    } 
  }
 
}

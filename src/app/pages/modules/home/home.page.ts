import { Component } from '@angular/core';
import { ISong } from 'src/app/models/song.model';

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

}

import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
   songs:ISong[]; 
  //   {
  //     name: "Baila conmigoooooo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     timesPlaying: 1458
  //   },
  //   {
  //     name: "Bailaa conmigo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     timesPlaying: 2589

  //   },
  //   {
  //     name: "Bailaa conmigo",
  //     artists: ["Selena Gómez", "Rauw Alejandro"],
  //     duration: "3:04",
  //     photoURL:"https://pbs.twimg.com/media/Esru2SuWMAM_TD6.jpg:large",
  //     path:"../../../../assets/tracks/Selena Gomez, Rauw Alejandro - Baila Conmigo (Official Video).m4a",
  //     timesPlaying: 2589

  //   }];
  constructor() { }

  ngOnInit() {
    // this.songs;
  }

}

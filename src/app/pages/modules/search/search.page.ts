import { Component, OnInit } from '@angular/core';
import { ISong } from 'src/app/models/song.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
   songs:ISong[]; 
   moreSongsExist:boolean = true;
   searchText: string;
   resetSearch:boolean = false;

  constructor(private fireStore: FirestoreService) { }

  async ngOnInit() {
    this.fireStore.getInitSongs().then(songs => this.songs = songs);
    
  }

  requesNextBatch(){
    this.fireStore.nextBatchOfSongs().then(songs => {
      songs.length!==0 ? this.songs = this.songs.concat(songs) : this.moreSongsExist=false;
    });
  }
  onResetIcon(){
    this.resetSearch = true;
  }
  search(){
    console.log(this.searchText);
    this.fireStore.searchBySongTitle(this.searchText);
  }
  onCleanSearchBar(){
    console.log("Limpiando");
    this.resetSearch = false; 
    this.searchText="";

  }

}

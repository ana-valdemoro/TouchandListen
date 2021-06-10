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
  noSearch: boolean = false;
  noResults : boolean = false;
  searchText: string ="";
  resultSongs : ISong[];



  constructor(private fireStore: FirestoreService) { }

  async ngOnInit() {
    this.fireStore.getInitSongs().then(songs => this.songs = songs);
    
  }

  requesNextBatch(){
    this.fireStore.nextBatchOfSongs().then(songs => {
      songs.length!==0 ? this.songs = this.songs.concat(songs) : this.moreSongsExist=false;
    });
  }
  showSearchRequest(object :any){
    console.log(object);
    const {searchText, songs } = object;
    this.noSearch = true;
    if(songs.length == 0){
      this.noResults = false;
      this.searchText = searchText;
    }else{
      this.noResults = true;
      this.resultSongs = songs;
    }
  }
  resetSearchPage(reset : boolean){
    if(reset){
      this.noResults = false;
      this.noSearch = false;
    }

  }

}

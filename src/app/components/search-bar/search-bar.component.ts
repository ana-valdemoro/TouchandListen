import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ISong } from 'src/app/models/song.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  allCatalog: ISong[];
  catalogObservable:  Observable<any>;
  searchText: string;
  resetSearch:boolean = false;
  @Output() notifySearchPage = new EventEmitter<any>();  
  @Output() resetSearchPage = new EventEmitter<any>();  
  
  constructor(private fireStore: FirestoreService) { }

  ngOnInit() {
    this.catalogObservable = this.fireStore.getAllSongs();
    this.catalogObservable.subscribe(songs => this.allCatalog = songs);
  }
  onResetIcon(){
    this.resetSearch = true;
  }

  search(){
    if(this.allCatalog != undefined){
      let array = this.allCatalog.filter(element =>{
        return element.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
      this.notifySearchPage.emit({searchText: this.searchText, songs: array});
    }

  }
  onCleanSearchBar(){
    console.log("Limpiando");
    this.resetSearch = false; 
    this.searchText="";
    this.resetSearchPage.emit(true);
  }

}

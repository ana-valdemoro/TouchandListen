import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
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
  
  constructor(private fireStore: FirestoreService) { }

  ngOnInit() {
    this.catalogObservable = this.fireStore.getAllSongs();
    this.catalogObservable.subscribe(songs => this.allCatalog = songs);
  }
  onResetIcon(){
    this.resetSearch = true;
  }
  //Búsqueda por título de canción;
  search(){
    console.log(this.searchText);
    if(this.allCatalog != undefined){
      let array = this.allCatalog.filter(element =>{
        return element.name.toLowerCase().includes(this.searchText);
      });
      console.log(array);
    }

  }
  onCleanSearchBar(){
    console.log("Limpiando");
    this.resetSearch = false; 
    this.searchText="";
  }

}

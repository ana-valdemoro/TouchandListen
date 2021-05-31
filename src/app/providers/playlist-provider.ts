import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';
import firebase from 'firebase';
import { ISongService } from "../services/song.service";
import { BehaviorSubject, Observable } from "rxjs";
// import 'rxjs/add/observable/combineLatest';

@Injectable({
    providedIn: 'root',
})

export class PlaylistProvider {
    playlistObserver: Observable<ISong[]>;
    likesFilter$: BehaviorSubject<string|null>;
    createdAtFilter$: BehaviorSubject<string|null>;

    constructor(private afs: AngularFirestore) {
        // this.playlistObserver = Observable.combineLatest(
        //     this.sizeFilter$,
        //     this.colorFilter$
        //   ).switchMap(([size, color]) => 
        //     afs.collection<Item>('items', ref => {
        //       let query : firebase.firestore.Query = ref;
        //       if (size) { query = query.where('size', '==', size) };
        //       if (color) { query = query.where('color', '==', color) };
        //       return query;
        //     }).valueChanges()
        //   );
     }

    public async addSong(song: ISong){
       if((await this.isSongInPlaylist(song._id)) == false){
        return this.afs.collection("Playlist").doc(song._id).set({
            ...song,
            createdAt : firebase.firestore.FieldValue.serverTimestamp() ,
            likesCount: 0,
            likes: [],
            isPlaying: false
            })
        .then(() => {return true})
        .catch(err => console.log("Error al añadir canción a la playlist", err));
       }else{
            return false;
       }
    }
    private async isSongInPlaylist(id:string){
        return (await this.afs.collection('Playlist').doc(id).get().toPromise()).data() ? true : false;
    }
    public async getAllSongs(){
        const songs = (await this.afs.collection('Playlist', ref => ref.orderBy('likesCount', 'desc').orderBy('createdAt').limit(10)).get()).toPromise(); 
        return songs.then((songs)=>{ 
            return ISongService.transformFromDocToISong(songs);
        });

    }
    getPlaylistObservable (){
        return this.playlistObserver;
    }
}

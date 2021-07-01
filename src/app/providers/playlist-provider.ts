import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';
import firebase from 'firebase';
import { ISongService } from "../services/song.service";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../models/user.model";
import { AuthProvider } from "./auth-provider";
// import 'rxjs/add/observable/combineLatest';

@Injectable({
    providedIn: 'root',
})

export class PlaylistProvider{
    private userObservable:  Observable<IUser>;
    private currentUser : any;
    
    constructor(private afs: AngularFirestore, private authProvider: AuthProvider) {
        this.userObservable = this.authProvider.getCurrentUser();
        this.userObservable.subscribe(user => this.currentUser = user );
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

    getPlaylistObservable (){
        return this.afs.collection('Playlist', ref => ref.where("isPlaying", "==", false).orderBy('likesCount', 'desc').orderBy('createdAt').limit(6)).valueChanges();
    }
    getEntirePlaylistObservable (){
        return this.afs.collection('Playlist', ref => ref.where("isPlaying", "==", false).orderBy('likesCount', 'desc').orderBy('createdAt')).valueChanges();
    }
    addLikeToSong(idSong){
        this.afs.collection('Playlist').doc(idSong).update( {likes: firebase.firestore.FieldValue.arrayUnion(this.currentUser.uid), likesCount: firebase.firestore.FieldValue.increment(1)});
    }
    deleteLikeToSong(idSong){
        this.afs.collection('Playlist').doc(idSong).update( {likes: firebase.firestore.FieldValue.arrayRemove(this.currentUser.uid), likesCount: firebase.firestore.FieldValue.increment(-1)});
    }
    getPlayingSong(){
        return this.afs.collection('Playlist', ref => ref.where("isPlaying", "==", true).limit(1)).valueChanges();
    }
}

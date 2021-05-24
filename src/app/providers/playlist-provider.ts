import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root',
})

export class PlaylistProvider {
    constructor(private afs: AngularFirestore) { }

    public async addSong(song: ISong){
       if((await this.isSongInPlaylist(song._id)) == false){
        return this.afs.collection("Playlist").doc(song._id).set({
            ...song,
            createdAt : firebase.firestore.FieldValue.serverTimestamp() ,
            likes: [],
            isPlaying: false
            })
        .then(() => {return true}, () => {return false} )
        .catch(err => console.log("Error al añadir canción a la playlist", err));
       }
    }
    private async isSongInPlaylist(id:string){
        return (await this.afs.collection('Playlist').doc(id).get().toPromise()).data() ? true : false;
    }
    // public async getAllSongs(){
    //     const songs = (await this.afs.collection('Playlist', ref => ref.limit(4)).get()).toPromise();
    //     //return this.formatDocIntoIsongList(songs);
    // }
}

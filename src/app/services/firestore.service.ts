import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  lastDocumentResponse :any ;
  constructor(private afs: AngularFirestore,) { }


  async getSong(id: string){
    return (await this.afs.collection('Songs').doc(id).get().toPromise()).data();
  }
  async getInitSongs(){
    const songs = (await this.afs.collection('Songs', ref => ref.limit(4)).get()).toPromise();
    return this.formatDocIntoIsongList(songs);
  }
  nextBatchOfSongs(){
    const songs = (this.afs.collection('Songs', ref => ref.startAfter(this.lastDocumentResponse).limit(4)).get()).toPromise();
    return this.formatDocIntoIsongList(songs);
  }
  private async formatDocIntoIsongList(songsDoc: Promise<firebase.firestore.QuerySnapshot<unknown>>):Promise<ISong[]>{
    const songsList = (await songsDoc).docs.map((doc, i, array) =>{
      let song = new ISong(doc.data());
      song._id = doc.id;
      if(i == array.length -1) this.lastDocumentResponse = doc ;
      return song;
    });
    return songsList;
  }
}

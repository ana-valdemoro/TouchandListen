import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';
import firebase from 'firebase';
import { ISongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  lastDocument :any ;
  constructor(private afs: AngularFirestore) { }


  // async getSong(id: string){
  //   return (await this.afs.collection('Songs').doc(id).get().toPromise()).data();
  // }
  async getInitSongs(){
    const songs = (await this.afs.collection('Songs', ref => ref.orderBy('AditionDate', 'desc').limit(4)).get()).toPromise();
    return songs.then((songs)=>{
      this.savelastDocument(songs);
      return ISongService.transformFromDocToISong(songs);
    })

  }
  public async nextBatchOfSongs():Promise<ISong[]>{
    const songs = (this.afs.collection('Songs', ref => ref.orderBy('AditionDate', 'desc').startAfter(this.lastDocument).limit(4)).get()).toPromise();
    return songs.then((songs)=>{
      this.savelastDocument(songs);
      return ISongService.transformFromDocToISong(songs);
    })
  }
  private savelastDocument(songsDoc: firebase.firestore.QuerySnapshot<unknown>) {
    this.lastDocument = songsDoc.docs[songsDoc.docs.length-1]
  }

  public getAllSongs(){
    return this.afs.collection('Songs').valueChanges();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  lastDocumentAccesed :any;
  constructor(private afs: AngularFirestore,) { }

  async getSong(id: string){
    return (await this.afs.collection('Songs').doc(id).get().toPromise()).data();
  }
  async getAllSongs(){
    const songs = (await this.afs.collection('Songs', ref => ref.limit(4)).get()).toPromise();

    const songsList = (await songs).docs.map(doc =>{
      let song = new ISong(doc.data());
      song._id = doc.id;
      return song;
    });
    return songsList;
   

  }
}

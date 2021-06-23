import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ISong } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class ISongService {

  constructor() { }

  public static async transformFromDocToISong(songsDoc: firebase.firestore.QuerySnapshot<unknown>): Promise<ISong[]>{
    let songsList = songsDoc.docs.map((doc) =>{  
      let song = new ISong(doc.data());
      song._id = doc.id;
      return song;
    });
    console.log(songsList);
    return songsList;

  }
}

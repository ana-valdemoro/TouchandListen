import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  public async getProfileImage(userUID:string){
    try {
      return this.angularFireStorage.ref(`/ProfileImages/${userUID}`).getDownloadURL();
    } catch(err) {
      console.log(err);
     }
  }
}

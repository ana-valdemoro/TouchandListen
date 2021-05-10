import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  //Subir imagénes de la galeria o con la cámara
  uploadProfileImage(file:any, path: string, imageName: string):Promise<boolean>{
    return new Promise( resolve => {
      const filePath = path + '/' + imageName;
      const ref = this.angularFireStorage.ref(filePath);
      ref.put(file).then(() => {resolve(true);});
    });

    //   task.snapshotChanges().pipe(
    //     finalize(() => {
    //       ref.getDownloadURL()
    //         .subscribe( URL =>{
    //           resolve(URL);
    //           return;
    //         });
    //     })
    //  );
    // });
  }

  public async getProfileImage(userUID:string){
    try {
      return this.angularFireStorage.ref(`/ProfileImages/${userUID}`).getDownloadURL();
    } catch(err) {
      console.log(err);
     }
  }
  // public async getProfileImageURL(userUID:string):Promise<string>{
  //   try {
  //     return firebase.storage().ref(`/ProfileImages/${userUID}`).getDownloadURL();
  //   } catch(err) {
  //     console.log(err);
  //    }
  // }
}

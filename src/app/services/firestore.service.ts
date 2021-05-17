import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore,) { }

  async getSong(id: string){
    return (await this.afs.collection('Songs').doc(id).get().toPromise()).data();

  }
}

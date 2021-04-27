import { Injectable } from "@angular/core";
// import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { IUser } from "../models/user.model";


@Injectable({
    providedIn: 'root',
  })
export class AuthProvider {
  public isLogged:any = false;
    constructor(public angularFireAuth: AngularFireAuth, private  angularFireStore: AngularFirestore){}

    login( email: string, password: string){
      try{
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
      }catch(error){
        console.log("Error", error);
      }
    }  
    async register(newUser: IUser){
      try{
        const { user } = await this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password);
        this.angularFireStore.collection('users').doc(user.uid).set({
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email
        }).catch(error => {
            console.log('Error adding user to firestore: ', error);
          })
        return user;
      }catch(error){
          console.log("Error on sign up user:", error);
      }
    }
    logout():void{
      try{
        this.angularFireAuth.signOut();
      }catch(error){  
        console.log("Error", error);
      }
    }
    private updateUserData(user:IUser){
      const userRef : AngularFirestoreDocument<IUser> = this.angularFireStore.doc(`users/${user._id}`); 
    }
}

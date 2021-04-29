import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from "rxjs";
import { IUser } from "../models/user.model";
import { switchMap } from "rxjs/operators";
import { UserProvider } from "./user-provider";
import firebase from "firebase/app"



@Injectable({
    providedIn: 'root',
  })
export class AuthProvider {
  // conts TOKEN_KEY:any = 'my-token';
  private user: firebase.User;
  private currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);
  subcription: any;
  constructor(public angularFireAuth: AngularFireAuth, private userProvider: UserProvider){}

    async login( email: string, password: string):Promise<firebase.User>{
      try{
        const { user } = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
        return user;
      }catch(error){
        console.log("Error", error);
      }
    }  
    async register(newUser: IUser){
      try{
        // const { user } = await this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password);
        this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(userCredential => {
            userCredential.user.updateProfile({displayName: newUser.name})
            .catch(err => console.log("No se ha podido actualizar datos", err));
          });
      }catch(error){
          console.log("Error on sign up user:", error);
      }
    }
    //Vamos a
    public getCurrentUser(){
      return this.angularFireAuth.currentUser;
    }
    async getUserUID(): Promise<string> {
      return (await this.angularFireAuth.currentUser).uid;
    }
    
    setCurrentUser():Promise<boolean>{
      return new Promise((resolve) => {
        this.subcription = this.angularFireAuth.authState
          .pipe(
            switchMap((fbUser) => {  
              return fbUser ? this.userProvider.getUserByUID(fbUser.uid) : of(null);
            })
          )
          .subscribe(async (user) => {
            try {
              if (!user) {
                this.currentUser.next(null);
              }
            }catch(error){
              console.error(error);
              resolve(false);
            }
            this.currentUser.next(user);
            console.log('Se setea el usuario ', user);
            resolve(true);
          });
      });
  }
    async logout():Promise<boolean>{
      try{
        await this.angularFireAuth.signOut();
        return true;
      }catch(error){  
        console.log("Error", error);
        return false;
      }
    }
}

import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from "rxjs";
import { IUser } from "../models/user.model";
import firebase from "firebase/app";
// import { userInfo } from "node:os";



@Injectable({
    providedIn: 'root',
  })
export class AuthProvider {
  // conts TOKEN_KEY:any = 'my-token';
  private user: any ;
  subcription: any;
  private currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null)
  private numero: number = 2;
  constructor(public angularFireAuth: AngularFireAuth){


  }

    async login( email: string, password: string):Promise<firebase.User>{
      try{
        const { user } = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
        this.setCurrentUser(user);
        return user;
      }catch(error){
        console.log("Error", error);
      }
    }  
    async register(newUser: IUser){
      try{
        this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(userCredential => {
            userCredential.user.updateProfile({displayName: newUser.displayName})
            .catch(err => console.log("No se ha podido actualizar datos", err));
          });
      }catch(error){
          console.log("Error on sign up user:", error);
      }
    }
    
    private setCurrentUser(user: IUser):void{
        if(user) {
          this.currentUser.next(user);
          localStorage.setItem("currentUser", user.uid);
        }else{
          this.currentUser.next(null);
          localStorage.removeItem("currentUser");
        }
    }
    public getCurrentUser(): Observable<IUser> {
      return this.currentUser;
    }

    async logout():Promise<boolean>{
      try{
        await this.angularFireAuth.signOut();
        this.setCurrentUser(null);
        return true;
      }catch(error){  
        console.log("Error", error);
        return false;
      }
    }
}

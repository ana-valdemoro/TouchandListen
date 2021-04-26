import { Injectable } from "@angular/core";
// import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from "../models/user.model";


@Injectable({
    providedIn: 'root',
  })
export class AuthProvider {
  public isLogged:any = false;
    constructor(public angularFireAuth: AngularFireAuth){}

    login( email: string, password: string){
      try{
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
      }catch(error){
        console.log("Error", error);
      }
    }  
    async register(email:string, password:string){
      try{
        const { user } = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
        return user;
      }catch(error){
        console.log("Error on register user:", error);
      }
    }
    logout():void{
      try{
        this.angularFireAuth.signOut();
      }catch(error){  
        console.log("Error", error);
      }
    }
}

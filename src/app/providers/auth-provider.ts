import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from "rxjs";
import { IUser } from "../models/user.model";
import firebase from "firebase/app";

@Injectable({
    providedIn: 'root',
  })
export class AuthProvider {
  subcription: any;
  private currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null)
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
        return this.angularFireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(userCredential => {
            userCredential.user.updateProfile({displayName: newUser.displayName})
            .catch(err => console.log("No se ha podido actualizar datos", err));
            return userCredential.user;
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
    async deleteUser(): Promise<boolean>{
      try{
        return (await this.angularFireAuth.currentUser).delete()
          .then( () =>{
            this.setCurrentUser(null);
            return true;
          })
          .catch((error)=>{
            console.log(error); 
            return false;
          });
      }catch(error){
        console.log(error);
        return false;
      }
    }
   
}

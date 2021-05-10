import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { AuthProvider } from '../providers/auth-provider';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  private currentUserObservable: Observable<IUser>;
  private currentUser : any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private navCtrl: NavController,
    private authProvider: AuthProvider){
      this.currentUserObservable = this.authProvider.getCurrentUser();
      this.currentUserObservable.subscribe(user => this.currentUser = user );
      //this.angularFireAuth.onAuthStateChanged(user => this.currentUser = user)
    }

  async canLoad() :Promise<boolean> {
    // let storagedUserUID = localStorage.getItem("currentUser");
    // if( this.currentUser && storagedUserUID == this.currentUser.uid) return true;
    // this.navCtrl.navigateForward(['/login']);
    // return false;
    return true
  }  
}

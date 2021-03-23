import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: IUser = {} as IUser;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  onSignIn(){
    this.navCtrl.navigateBack(['/login']);
  }
  onSignUp(){}
  onCheckFields(){
    return !this.user.name || !this.user.surname || !this.user.email || !this.user.password;
  }
  getPassword(event:string){
    console.log(event);
    this.user.password = event;
  }
}

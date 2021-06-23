import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IUser } from 'src/app/models/user.model';
import { AuthProvider } from 'src/app/providers/auth-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: IUser = {} as IUser;
  constructor(public navCtrl: NavController,  private authProvider: AuthProvider) { }

  ngOnInit() {
  }
  onResetPasswordView(){
    this.navCtrl.navigateForward(['/reset-password']);
  }
  async onSignIn(){
    let user = await this.authProvider.login(this.user.email, this.user.password);
    if(user) this.navCtrl.navigateRoot(['/tabs']);
  }
  onSignUp(){
    this.navCtrl.navigateForward(['/signup']);
  }
  onSignInWith(){

  }
  getPassword(response:any):void{
    this.user.password = response.password;
  }
  onCheckFields():boolean{
    return !this.user.email || !this.user.password;
  }

}

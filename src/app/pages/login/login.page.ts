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
  onResetPassword(){
    console.log("A resetear la contraseña");
  }
  async onSignIn(){
    if(this.user.email && this.user.password ){
      const user = await this.authProvider.login(this.user.email, this.user.password);
      if(user){
        //this.onShowSuccesModal();
      }
    }
    this.navCtrl.navigateRoot(['/tabs']);
  }
  onSignUp(){
    this.navCtrl.navigateForward(['/signup']);
  }
  onSignInWith(){

  }
  getPassword(password:string):void{
    this.user.password = password;
  }
  onCheckFields():boolean{
    return !this.user.email || !this.user.password;
  }

}

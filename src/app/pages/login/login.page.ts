import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationModal } from 'src/app/modals/navigation-modal/navigation-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { IUser } from 'src/app/models/user.model';
import { AuthProvider } from 'src/app/providers/auth-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: IUser = {} as IUser;
  cleanInput:boolean = false;
  showPassword:boolean = false;
  passwordToggleIcon:string = "eye-off";
  constructor(public navCtrl: NavController,  private authProvider: AuthProvider, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  onResetPasswordView(){
    this.navCtrl.navigateForward(['/reset-password']);
  }
  async onSignIn(){
    this.authProvider.login(this.user.email, this.user.password)
      .then( userCredential =>{
        this.authProvider.setCurrentUser(userCredential.user)
        this.navCtrl.navigateRoot(['/tabs']);
      }, err =>{
          if(err.message.includes("password is invalid")) this.shownOnWrongPassword();
          if (err.message.includes("no user record")) {
            this.showOnSignUpModal();
          }

      })
  }
  async shownOnWrongPassword() {
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: `Contraseña incorrecta`,
      secondaryMessage: "Por favor, inténtelo de nuevo.",
      buttonMessage: ["Cerrar"],
      navigationRoute: "/signup"
    };
    const modal = await this.modalCtrl.create({
      component: NavigationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
  }
  async showOnSignUpModal() {
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: `Usuario no existe en la base de datos`,
      buttonMessage: ["Crear usuario"],
      navigationRoute: "/signup"
    };
    const modal = await this.modalCtrl.create({
      component: NavigationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  navigationActivated :boolean  =  (await modal.onDidDismiss()).data;
    if(navigationActivated === true) { 
      this.cleanFields();
      return this.navCtrl.navigateForward([modalData.navigationRoute]);
    }
  }
  cleanFields() {
    this.user.email = "";
    this.user.password = "";
  }
  togglePassword():void{
    this.showPassword = !this.showPassword ;
    if(this.passwordToggleIcon == "eye-off"){
      this.passwordToggleIcon = "eye";
    }else{
      this.passwordToggleIcon = "eye-off";
    }
  }
  onSignUp(){
    this.navCtrl.navigateForward(['/signup']);
  }
  onSignInWith(){

  }
  // getPassword(response:any):void{
  //   this.user.password = response.password;
  // }
  onCheckFields():boolean{
    return !this.user.email || !this.user.password;
  }

}

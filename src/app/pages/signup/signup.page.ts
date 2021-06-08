import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IUser } from 'src/app/models/user.model';
import { IModalData } from 'src/app/models/modal-data.model'; 
import { AuthProvider } from 'src/app/providers/auth-provider';
import { TermsAndConditionsModal } from 'src/app/modals/terms-and-conditions-modal/terms-and-conditions-modal.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: IUser = {} as IUser;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private authProvider: AuthProvider) { }

  ngOnInit() {
  }
  onSignIn(){
    this.navCtrl.navigateBack(['/login']);
  }
  async onShowSuccesModal(){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: "Su cuenta ha sido creada con éxito",
      buttonMessage: ["Iniciar sesión"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateRoot([ruta]);
    }
  }
  async onSignUp(){
      this.authProvider.register(this.user)
        .then((user) => {
          if (user) this.onShowSuccesModal();
        });
  }
  onCheckFields(){
    return !this.user.displayName || !this.user.phoneNumber || !this.user.email || !this.user.password;
  }
  getPassword(password:string):void{
    this.user.password = password;
  }
  async onAceptTermsAndConditions(){
    const modal = await this.modalCtrl.create({
      component: TermsAndConditionsModal,
      backdropDismiss: true,
      cssClass: ["modal-container","terms-and-conditions"]
    });
    await modal.present();
  }
}

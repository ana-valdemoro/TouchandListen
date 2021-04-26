import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IUser } from 'src/app/models/user.model';
import { IModalData } from 'src/app/models/modal-data.model'; 
import { AuthProvider } from 'src/app/providers/auth-provider';
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
    if(this.user.email && this.user.password ){
      const user = await this.authProvider.register(this.user.email, this.user.password);
      if(user){
        this.onShowSuccesModal();
      }
    }
  }
  onCheckFields(){
    return !this.user.name || !this.user.surname || !this.user.email || !this.user.password;
  }
  getPassword(password:string){
    this.user.password = password;
  }
}

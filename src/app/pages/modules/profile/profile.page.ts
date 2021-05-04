import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ModalController, NavController } from '@ionic/angular';
import { SelectOptionModal } from 'src/app/modals/select-option-modal/select-option-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { AuthProvider } from 'src/app/providers/auth-provider';
import { UserProvider } from 'src/app/providers/user-provider';
import { Observable } from 'rxjs';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editToggleIcon:string = "fa-pen";
  disableEditionMode: boolean = true;
  user: IUser;
  nameEditionMode:boolean = true;
  phoneNumberEditionMode: boolean = true;
  emailEditionMode : boolean = true;
  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,  
    private authProvider: AuthProvider,
    private UserProvider: UserProvider ) { }

  async ngOnInit() {
    await this.UserProvider.getLoggedUser().then(user => this.user = user);
  }
  onLogOut():Boolean{
    return this.authProvider.logout() ? true : false;
  }
  async onAskToLogOut(){
    let modalData: IModalData = {
      image: "fas fa-sign-out-alt",
      message: "¿Estás seguro de querer cerrar sesión?",
      buttonMessage: ["Cancelar", "Sí"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: SelectOptionModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  navigationActivated :boolean  =  (await modal.onDidDismiss()).data;
    if(navigationActivated && this.onLogOut()) { 
      return this.navCtrl.navigateRoot([modalData.navigationRoute]);
    }
  }
  async onDeleteAccount(){
    let modalData: IModalData = {
      image: "fas fa-trash-alt",
      message: "¿Estás seguro de querer eliminar la cuenta?",
      buttonMessage: ["No", "Sí"],
      navigationRoute: "/tabs/profile/delete-acount"
    };
    const modal = await this.modalCtrl.create({
      component: SelectOptionModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateForward ([ruta]);
    }
  }
  async onUpdateDisplayName(newDisplayName:string){
    this.nameEditionMode = !this.nameEditionMode;
    if(newDisplayName && this.nameEditionMode == true){
      console.log(newDisplayName);
      let res = await this.UserProvider.updateDisplayName(newDisplayName);
        if (res === true) {
          console.log("hello<2");
          this.onShowSuccessfulModal("nombre");
        }else{
          this.onShowFailureModal("nombre");
        }
    }
  }
  async onShowSuccessfulModal(field: string){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: `Su ${field} ha sido actualizado con éxito`,
      buttonMessage: ["Salir"],
      navigationRoute: ""
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
  }
  async onShowFailureModal(field:string){
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: `Su ${field} no ha podido ser actualizado`,
      buttonMessage: ["Salir"],
      navigationRoute: ""
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
  }
}

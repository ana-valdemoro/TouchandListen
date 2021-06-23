import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { observable } from 'rxjs';
import { NavigationModal } from 'src/app/modals/navigation-modal/navigation-modal.component';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { AuthProvider } from 'src/app/providers/auth-provider';
import { UserProvider } from 'src/app/providers/user-provider';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-delete-acount-page',
  templateUrl: './delete-acount-page.page.html',
  styleUrls: ['./delete-acount-page.page.scss'],
})
export class DeleteAcountPagePage implements OnInit {

  constructor(private modalCtrl: ModalController,
      public navCtrl: NavController,  
      private authProvider: AuthProvider,
      private firestorageService: FirestorageService,
      private userProvider: UserProvider) { }

  async ngOnInit() {
    this.deleteAccount();
  }
  async deleteAccount(){
    let user = await this.userProvider.getLoggedUser();
    console.log(user);
    this.firestorageService.deleteProfileImage(user.uid)
      .then(async observal =>{
        observal.subscribe( ()=>{
          console.log("Se elimino la imagen del firestore");
        }, 
        (err)=>{
          console.log("No se ha eliminado la imagen por: ", err);
        });
        this.authProvider.deleteUser()
          .then( (deleted) =>{
            if(deleted){
              console.log("Hemos eliminado la cuenta");
              this.onShowSuccessModal();
            }else{
              this.onShowFailModal();
            }   
          })
      });
    
  }
  async onShowSuccessModal(){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: "Su cuenta ha sido eliminada con éxito",
      buttonMessage: ["Salir"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps: {modalData: modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    if( await modal.onDidDismiss()) { 
      return this.navCtrl.navigateRoot([modalData.navigationRoute]);
    }
  }
  async onShowFailModal(){
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: "Su cuenta no ha podido ser eliminada",
      secondaryMessage:"Inicie sesión nuevamente ",
      buttonMessage: ["Iniciar sesión"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: NavigationModal,
      backdropDismiss: false,
      componentProps: {modalData: modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    if( await modal.onDidDismiss()) { 
      return this.navCtrl.navigateRoot([modalData.navigationRoute]);
    }
  }
}

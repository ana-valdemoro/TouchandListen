import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-delete-acount-page',
  templateUrl: './delete-acount-page.page.html',
  styleUrls: ['./delete-acount-page.page.scss'],
})
export class DeleteAcountPagePage implements OnInit {

  constructor(private modalCtrl: ModalController, public navCtrl: NavController) { }

  async ngOnInit() {
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
    setTimeout(async ()=>{
      await modal.present();
    }, 5000);
    if( await modal.onDidDismiss()) { 
      return this.navCtrl.navigateRoot(modalData.navigationRoute);
    }
    
  }

}

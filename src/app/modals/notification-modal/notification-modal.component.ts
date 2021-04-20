import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModal implements OnInit {
  modalData: IModalData = {
    image: "fas fa-check-circle",
    message: "Su cuenta ha sido creada con éxito",
    buttonMessage: ["Iniciar sesión"],
    navigationRoute: "/login"
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }
  async onCloseModal(): Promise<boolean>{
    return this.modalCtrl.dismiss(this.modalData.navigationRoute);
  }

}

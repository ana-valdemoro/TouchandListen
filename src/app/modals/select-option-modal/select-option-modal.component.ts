import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-select-option-modal',
  templateUrl: './select-option-modal.component.html',
  styleUrls: ['./select-option-modal.component.scss'],
})
export class SelectOptionModal implements OnInit {
  modalData: IModalData = {
    image: "fas fa-trash-alt",
    message: "¿Estás seguro de querer eliminar la cuenta?",
    buttonMessage: ["No", "Sí"],
    navigationRoute: "/login"
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onDeleteAccountView():Promise<boolean>{
    return this.modalCtrl.dismiss();
  }
  onDismissModal():Promise<boolean>{
    return this.modalCtrl.dismiss();
  }
}

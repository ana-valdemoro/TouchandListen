import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModal implements OnInit {
  @Input() modalData: IModalData; 
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }
  async onCloseModal(): Promise<boolean>{
    return this.modalCtrl.dismiss(this.modalData.navigationRoute);
  }

}

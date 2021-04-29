import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-select-option-modal',
  templateUrl: './select-option-modal.component.html',
  styleUrls: ['./select-option-modal.component.scss'],
})
export class SelectOptionModal implements OnInit {
  @Input() modalData: IModalData;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onRedirectView():Promise<boolean>{
    return this.modalCtrl.dismiss(true);
  }
  onDismissModal():Promise<boolean>{
    return this.modalCtrl.dismiss(false);
  }
}

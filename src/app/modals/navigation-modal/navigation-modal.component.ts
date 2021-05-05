import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IModalData } from 'src/app/models/modal-data.model';

@Component({
  selector: 'app-navigation-modal',
  templateUrl: './navigation-modal.component.html',
  styleUrls: ['./navigation-modal.component.scss'],
})
export class NavigationModal implements OnInit {
  @Input() modalData: IModalData; 
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  onRedirectModal():Promise<boolean>{
    return this.modalCtrl.dismiss(true);
  }
}

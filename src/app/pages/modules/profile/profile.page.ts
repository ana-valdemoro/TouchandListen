import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ModalController, NavController } from '@ionic/angular';
import { SelectOptionModal } from 'src/app/modals/select-option-modal/select-option-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editToggleIcon:string = "fa-pen";
  disableEditionMode: boolean = true;
  user: IUser = {
    name: "Dua Lipa",
    surname: "Smith",
    email: "dualipa@gmail.ccomm",
    password: "ANoche"
  } as IUser;
  nameEditionMode:boolean = true;
  passwordEditionMode: boolean = true;
  emailEditionMode : boolean = true;
  showPassword:boolean = false;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async onDeleteAccount(){
    const modal = await this.modalCtrl.create({
      component: SelectOptionModal,
      backdropDismiss: true,
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateRoot([ruta]);
    }
  }

}

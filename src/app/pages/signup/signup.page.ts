import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: IUser = {} as IUser;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  onSignIn(){
    this.navCtrl.navigateBack(['/login']);
  }
  async onSignUp(){
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateRoot([ruta]);
    }
  }
  onCheckFields(){
    return !this.user.name || !this.user.surname || !this.user.email || !this.user.password;
  }
  getPassword(event:string){
    console.log(event);
    this.user.password = event;
  }
}

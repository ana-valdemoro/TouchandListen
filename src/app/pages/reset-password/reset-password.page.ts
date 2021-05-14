import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationModal } from 'src/app/modals/navigation-modal/navigation-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { AuthProvider } from 'src/app/providers/auth-provider';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email:string;
  constructor(private authProvider: AuthProvider, private modalCtrl: ModalController, private navCtrl: NavController) { }

  ngOnInit() {
  }
  onResetPassword(){
    this.authProvider.resetPassword(this.email)
      .then(
        async () =>{
          let modalData: IModalData = {
            image: "fas fa-check-circle",
            message: "Correo de recuperación de contraseña enviado con éxito",
            secondaryMessage: "Revise la bandeja de Spam",
            buttonMessage: ["Cerrar"],
            navigationRoute: "/login"
          };
          const modal = await this.modalCtrl.create({
            component:  NavigationModal,
            backdropDismiss: true,
            componentProps:{modalData : modalData},
            cssClass: "modal-container"
          });
          await modal.present();
          const navigationActivated:boolean = (await modal.onDidDismiss()).data;
          if(navigationActivated) this.navCtrl.navigateBack(modalData.navigationRoute);
        }
      )
  }
}

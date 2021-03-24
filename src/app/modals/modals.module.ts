import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModal } from './notification-modal/notification-modal.component';
import { IonicModule } from '@ionic/angular';


const modals = [NotificationModal];
@NgModule({
  declarations: [...modals],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...modals]
})
export class ModalsModule { }

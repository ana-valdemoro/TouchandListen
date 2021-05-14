import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModal } from './notification-modal/notification-modal.component';
import { IonicModule } from '@ionic/angular';
import { NavigationModal } from './navigation-modal/navigation-modal.component';
import { SelectOptionModal } from './select-option-modal/select-option-modal.component';


const modals = [NotificationModal, NavigationModal, SelectOptionModal];
@NgModule({
  declarations: [...modals],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...modals]
})
export class ModalsModule { }

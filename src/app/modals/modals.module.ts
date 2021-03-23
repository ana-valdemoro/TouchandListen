import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModal } from './notification-modal/notification-modal.component';


const modals = [NotificationModal];
@NgModule({
  declarations: [...modals],
  imports: [
    CommonModule
  ],
  exports: [...modals]
})
export class ModalsModule { }

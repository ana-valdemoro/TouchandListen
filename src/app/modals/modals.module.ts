import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModal } from './notification-modal/notification-modal.component';
import { IonicModule } from '@ionic/angular';
import { NavigationModal } from './navigation-modal/navigation-modal.component';
import { SelectOptionModal } from './select-option-modal/select-option-modal.component';
import { TermsAndConditionsModal } from './terms-and-conditions-modal/terms-and-conditions-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const modals = [NotificationModal, NavigationModal, SelectOptionModal, TermsAndConditionsModal];
@NgModule({
  declarations: [...modals],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...modals]
})
export class ModalsModule { }

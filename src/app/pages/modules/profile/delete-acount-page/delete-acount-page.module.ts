import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteAcountPagePageRoutingModule } from './delete-acount-page-routing.module';

import { DeleteAcountPagePage } from './delete-acount-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteAcountPagePageRoutingModule
  ],
  declarations: [DeleteAcountPagePage]
})
export class DeleteAcountPagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input/password-input.component';
import { IonicModule } from '@ionic/angular';

const components = [
  PasswordInputComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...components]
})
export class ComponentsModule { }

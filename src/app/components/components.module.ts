import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input/password-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const components = [
  PasswordInputComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [...components]
})
export class ComponentsModule { }

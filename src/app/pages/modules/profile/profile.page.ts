import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

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
  constructor() { }

  ngOnInit() {
  }
  onDeleteAccount(){

  }

}
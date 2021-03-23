import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  passwordToggleIcon:string = "eye-off";
  showPassword:boolean = false;
  constructor() { }

  ngOnInit() {}
  togglePassword():void{
    this.showPassword = !this.showPassword ;
    if(this.passwordToggleIcon == "eye-off"){
      this.passwordToggleIcon = "eye";
    }else{
      this.passwordToggleIcon = "eye-off";
    }
  }
}

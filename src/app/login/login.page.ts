import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onResetPassword(){
    console.log("A resetear la contraseña");
  }
  onSignIn(){}
  onSignUp(){
    console.log("Loguenado con X");
  }


}

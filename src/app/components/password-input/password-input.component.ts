import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  passwordForm : FormGroup;
  passwordToggleIcon:string = "eye-off";
  showPassword:boolean = false;
  @Output() passwordCompleted = new EventEmitter();
  // password:string = ""  ;
  constructor(private formBuilder: FormBuilder) { 
    this.passwordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    
    });
  }
  get password() { return this.passwordForm.get('password'); }
  ngOnInit() {}
  togglePassword():void{
    this.showPassword = !this.showPassword ;
    if(this.passwordToggleIcon == "eye-off"){
      this.passwordToggleIcon = "eye";
    }else{
      this.passwordToggleIcon = "eye-off";
    }
  }
  onNotifyPassword(){
    this.passwordCompleted.emit( {status: this.passwordForm.status ,password: this.password.value});
  }
}

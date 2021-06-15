import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { IUser } from 'src/app/models/user.model';
import { IModalData } from 'src/app/models/modal-data.model'; 
import { AuthProvider } from 'src/app/providers/auth-provider';
import { TermsAndConditionsModal } from 'src/app/modals/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: IUser = {} as IUser;
  signUpForm : FormGroup;
  validPassword: boolean = false;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private authProvider: AuthProvider, private formBuilder: FormBuilder) { 
    this.signUpForm = this.formBuilder.group({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[A-Za-z0-9._%+-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')
      ])
    });
  }
  get displayName() { return this.signUpForm.get('displayName'); }
  get email() { return this.signUpForm.get('email'); }

  ngOnInit() {
  }
  onSignIn(){
    this.navCtrl.navigateBack(['/login']);
  }
  async onShowSuccesModal(){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: "Su cuenta ha sido creada con éxito",
      buttonMessage: ["Iniciar sesión"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateRoot([ruta]);
    }
  }
  private async onSignUp(){
      this.authProvider.register(this.user)
        .then((user) => {
          if (user) this.onShowSuccesModal();
        });
  }
  onCheckFields(){
    return !this.user.displayName || !this.user.email || !this.user.password;
  }
  getPassword(response: any):void{
    this.user.password = response.password;
    let status :boolean = response.status;
    if (status) this.validPassword = true; else this.validPassword = false;
  }
  async onAceptTermsAndConditions(){
    const modal = await this.modalCtrl.create({
      component: TermsAndConditionsModal,
      backdropDismiss: true,
      cssClass: ["modal-container","terms-and-conditions"]
    });
    await modal.present();
    modal.onDidDismiss().then( res =>{
      if(res.data !== undefined ){
        const {terms, policy} = res.data;
        if (terms == true && policy == true) this.onSignUp();
      }
    })
  }
  onFormValidation():boolean{
    return !(this.signUpForm.valid && this.validPassword) ;
  }
}

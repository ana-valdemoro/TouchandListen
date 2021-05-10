import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { ActionSheetController, ModalController, NavController, Platform } from '@ionic/angular';
import { SelectOptionModal } from 'src/app/modals/select-option-modal/select-option-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { AuthProvider } from 'src/app/providers/auth-provider';
import { UserProvider } from 'src/app/providers/user-provider';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { NavigationModal } from 'src/app/modals/navigation-modal/navigation-modal.component';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('email') email;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  editToggleIcon:string = "fa-pen";
  disableEditionMode: boolean = true;
  user: IUser;
  nameEditionMode:boolean = true;
  phoneNumberEditionMode: boolean = true;
  emailEditionMode : boolean = true;
  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,  
    private authProvider: AuthProvider,
    private UserProvider: UserProvider,
    private firestorageService : FirestorageService,
    private actionSheetCtrl: ActionSheetController,
    private plt: Platform 
    ) { }

  async ngOnInit() {
    await this.UserProvider.getLoggedUser().then(user => this.user = user);
  }
  onLogOut():Boolean{
    return this.authProvider.logout() ? true : false;
  }
  async onAskToLogOut(){
    let modalData: IModalData = {
      image: "fas fa-sign-out-alt",
      message: "¿Estás seguro de querer cerrar sesión?",
      buttonMessage: ["Cancelar", "Sí"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: SelectOptionModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  navigationActivated :boolean  =  (await modal.onDidDismiss()).data;
    if(navigationActivated && this.onLogOut()) { 
      return this.navCtrl.navigateRoot([modalData.navigationRoute]);
    }
  }
  async onDeleteAccount(){
    let modalData: IModalData = {
      image: "fas fa-trash-alt",
      message: "¿Estás seguro de querer eliminar la cuenta?",
      buttonMessage: ["No", "Sí"],
      navigationRoute: "/tabs/profile/delete-acount"
    };
    const modal = await this.modalCtrl.create({
      component: SelectOptionModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  ruta  =  (await modal.onDidDismiss()).data;
    if(ruta) { 
      return this.navCtrl.navigateForward ([ruta]);
    }
  }
  async onUpdateDisplayName(newDisplayName:string){
    this.nameEditionMode = !this.nameEditionMode;
    if(newDisplayName!==this.user.displayName && this.nameEditionMode == true ){
      let res = await this.UserProvider.updateDisplayName(newDisplayName);
        if (res === true) {
          this.user.displayName = newDisplayName;
          this.onShowSuccessfulModal("nombre");
        }else{
          this.onShowFailureModal("nombre");
        }
    }
  }
  async onUpdateEmail(email:string){
    this.emailEditionMode = !this.emailEditionMode;
    if(email!==this.user.email && this.emailEditionMode== true){
      let res = await this.UserProvider.updateEmail(email);
      console.log(res);
      if (res === true) {
        this.onShowSuccessfulModal("email");
      }else{
        this.email.value = this.user.email;
        this.onShowReStartSessionModal();
      }
    }
  }
  async onShowSuccessfulModal(field: string){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: `Su ${field} ha sido actualizado con éxito`,
      buttonMessage: ["Cerrar"],
      navigationRoute: ""
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
  }
  async onShowFailureModal(field:string){
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: `Su ${field} no ha podido ser actualizado`,
      buttonMessage: ["Cerrar"],
      navigationRoute: ""
    };
    const modal = await this.modalCtrl.create({
      component: NotificationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
  }
  async onShowReStartSessionModal(){
    let modalData: IModalData = {
      image: "fas fa-times-circle",
      message: `Su email no ha podido ser actualizado`,
      secondaryMessage: "Debe iniciar sesión nuevamente",
      buttonMessage: ["Iniciar sesión"],
      navigationRoute: "/login"
    };
    const modal = await this.modalCtrl.create({
      component: NavigationModal,
      backdropDismiss: true,
      componentProps:{modalData : modalData},
      cssClass: "modal-container"
    });
    await modal.present();
    const  navigationActivated :boolean  =  (await modal.onDidDismiss()).data;
    if(navigationActivated === true && this.onLogOut()) { 
      return this.navCtrl.navigateRoot([modalData.navigationRoute]);
    }
  }

  async selectImageSource(){
    const buttons = [
      {
        text: 'Hacer una foto',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Elegir foto de la galería',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
     // Only allow file selection inside a browser
     if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }  
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Foto de perfil',
      buttons
    });
    await actionSheet.present();

  }
  async addImage(source : CameraSource){
    console.log("Vamos a elegir imagen de perfil");
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    let res  = await this.firestorageService.uploadProfileImage( blobData,'ProfileImages', this.user.uid);
    let newPhotoUlr = await this.firestorageService.getProfileImage(this.user.uid);
    console.log("La respuesta es",res);
    //this.user.photoURL = await this.firestorageService.getProfileImage(this.user.uid).then( observable =>{ return observable;});
    if(res && newPhotoUlr){    
      this.user.photoURL = newPhotoUlr; 
      this.onShowSuccessfulModal("foto de perfil");
    }else{
      this.onShowFailureModal("foto de perfil")
    }
    

  }
  async uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    let res  = await this.firestorageService.uploadProfileImage(file,'ProfileImages', this.user.uid);
    let newPhotoUlr = await this.firestorageService.getProfileImage(this.user.uid);
    console.log("La respuesta es",res);
    if(res && newPhotoUlr){    
      this.user.photoURL = newPhotoUlr; 
      this.onShowSuccessfulModal("foto de perfil");
    }else{
      this.onShowFailureModal("foto de perfil")
    }
  }
  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

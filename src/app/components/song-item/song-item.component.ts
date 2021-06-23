import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificationModal } from 'src/app/modals/notification-modal/notification-modal.component';
import { SelectOptionModal } from 'src/app/modals/select-option-modal/select-option-modal.component';
import { IModalData } from 'src/app/models/modal-data.model';
import { ISong } from 'src/app/models/song.model';
import { PlaylistProvider } from 'src/app/providers/playlist-provider';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
})
export class SongItemComponent implements OnInit {
  @Input() song:ISong;
  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private playlistProvider: PlaylistProvider) { }

  ngOnInit() {}
  onAddPlaylist(){
    this.playlistProvider.addSong(this.song)
    .then(res =>{
      if(res){
        console.log("Hemos añadido a la playlist");
        this.onShowSuccesfullModal();
      }else{
        this.onShowFailureModal();
      }
    })
  }
  async onShowSuccesfullModal(){
    let modalData: IModalData = {
      image: "fas fa-check-circle",
      message: "Canción añadida a la playlist correctamente",
      buttonMessage: ["Seguir buscando canciones", "Ver posición en la playlist"],
      navigationRoute: "/login"
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
      return this.navCtrl.navigateRoot([ruta]);
    }
  }
  async onShowFailureModal(){
    let modalData: IModalData = {
      image: "fas  fa-exclamation-circle",
      message: `Esta canción ya se encuentra en la playlist`,
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
}

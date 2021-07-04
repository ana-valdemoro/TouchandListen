import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public navCtrl: NavController) {
    setTimeout( () =>{
      this.navCtrl.navigateRoot(['/login']);
    }, 1800);
   }

  ngOnInit() {
  }

}

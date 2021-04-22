import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonTabs } from '@ionic/angular/directives/navigation/ion-tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }
  @ViewChild('tabs') tabs: IonTabs;

  ngOnInit() {}
  tabs_routes = [
    {
      path: 'home',
      icon: 'fa-home',
      selected: false
    },
    {
      path: 'search',
      icon: 'fa-search',
      selected: false
    },
    {
      path: 'profile',
      icon: 'fa-user-circle',
      selected: false
    },
  ];
  setActivatedTab():void{
    let selectedTab = this.tabs.getSelected();
    this.tabs_routes.forEach(tab =>{
      if(tab.path == selectedTab) tab.selected=true; else tab.selected =false;
    });
    
  }
}

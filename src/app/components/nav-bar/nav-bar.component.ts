import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  tabs = [
    {
      path: 'home',
      icon: 'home',
    },
    {
      path: 'search',
      icon: 'clipboard-outline',
    },
    {
      path: 'profile',
      icon: 'person-circle-outline',
    },
  ];

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) {
    this.initializeApp();
  }
  initializeApp(){
    //sthis.router.navigateByUrl('login'); //Esto no es muy buena usarlo porque cada  vez que reinicio la app me rederige aqui por defecto.
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('../modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../modules/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../modules/search/search.module').then( m => m.SearchPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

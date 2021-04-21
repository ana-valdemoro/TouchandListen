import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteAcountPagePage } from './delete-acount-page.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteAcountPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteAcountPagePageRoutingModule {}

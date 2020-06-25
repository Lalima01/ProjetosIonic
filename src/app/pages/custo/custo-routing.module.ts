import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustoPage } from './custo.page';

const routes: Routes = [
  {
    path: '',
    component: CustoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustoPageRoutingModule {}

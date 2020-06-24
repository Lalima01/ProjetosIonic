import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AportePage } from './aporte.page';

const routes: Routes = [
  {
    path: '',
    component: AportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AportePageRoutingModule {}

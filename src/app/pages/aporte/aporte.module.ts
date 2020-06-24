import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AportePageRoutingModule } from './aporte-routing.module';

import { AportePage } from './aporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AportePageRoutingModule
  ],
  declarations: [AportePage]
})
export class AportePageModule {}

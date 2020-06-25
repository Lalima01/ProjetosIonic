import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustoPageRoutingModule } from './custo-routing.module';

import { CustoPage } from './custo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustoPageRoutingModule
  ],
  declarations: [CustoPage]
})
export class CustoPageModule {}

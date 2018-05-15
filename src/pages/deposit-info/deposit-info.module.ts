import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositInfoPage } from './deposit-info';

@NgModule({
  declarations: [
    DepositInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositInfoPage),
  ],
})
export class DepositInfoPageModule {}

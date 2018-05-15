import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositInitialPage } from './deposit-initial';

@NgModule({
  declarations: [
    DepositInitialPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositInitialPage),
  ],
})
export class DepositInitialPageModule {}

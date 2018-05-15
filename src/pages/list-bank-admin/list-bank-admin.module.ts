import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBankAdminPage } from './list-bank-admin';

@NgModule({
  declarations: [
    ListBankAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBankAdminPage),
  ],
})
export class ListBankAdminPageModule {}

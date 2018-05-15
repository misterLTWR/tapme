import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MListBankUsersPage } from './m-list-bank-users';

@NgModule({
  declarations: [
    MListBankUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(MListBankUsersPage),
  ],
})
export class MListBankUsersPageModule {}

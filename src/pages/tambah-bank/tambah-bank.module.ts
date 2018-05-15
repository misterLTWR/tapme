import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahBankPage } from './tambah-bank';

@NgModule({
  declarations: [
    TambahBankPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahBankPage),
  ],
})
export class TambahBankPageModule {}

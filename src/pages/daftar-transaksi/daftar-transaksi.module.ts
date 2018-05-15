import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaftarTransaksiPage } from './daftar-transaksi';

@NgModule({
  declarations: [
    DaftarTransaksiPage,
  ],
  imports: [
    IonicPageModule.forChild(DaftarTransaksiPage),
  ],
})
export class DaftarTransaksiPageModule {}

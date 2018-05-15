import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTransaksiPage } from './detail-transaksi';

@NgModule({
  declarations: [
    DetailTransaksiPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailTransaksiPage),
  ],
})
export class DetailTransaksiPageModule {}

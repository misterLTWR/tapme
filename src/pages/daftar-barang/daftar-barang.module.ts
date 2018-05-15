import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaftarBarangPage } from './daftar-barang';

@NgModule({
  declarations: [
    DaftarBarangPage,
  ],
  imports: [
    IonicPageModule.forChild(DaftarBarangPage),
  ],
})
export class DaftarBarangPageModule {}

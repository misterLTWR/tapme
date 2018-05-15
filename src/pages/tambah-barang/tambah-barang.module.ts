import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahBarangPage } from './tambah-barang';

@NgModule({
  declarations: [
    TambahBarangPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahBarangPage),
  ],
})
export class TambahBarangPageModule {}

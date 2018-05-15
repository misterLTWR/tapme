import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DaftarBarangPage } from '../daftar-barang/daftar-barang';
import { MBarangPage } from '../m-barang/m-barang';
import { TerimalangsungPage } from '../terimalangsung/terimalangsung';
import { BarcodePage } from '../barcode/barcode';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-nota',
  templateUrl: 'nota.html',
})
export class NotaPage {
  profil:Observable<any>;
  carts:Observable<any[]>;
  total:number;
  subTotal:number;
  pcs:number;
  disc:number;
  pajak:number
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private auth:AuthProvider,
    private db:DatabaseProvider
    
  ) {
  }

  ionViewDidEnter() {
    // console.log('ionViewDidLoad NotaPage');
    let uid = this.auth.getUid();
    this.profil = this.auth.profil;
    this.carts = this.db.getAllCart(uid).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.carts.subscribe(snap=>{
      this.pcs= _.sumBy(snap,'Jumlah');
      this.disc= _.sumBy(snap,'nilaiDisc');
      this.pajak= _.sumBy(snap,'nilaiPajak');
      this.subTotal = _.sumBy(snap,'Total');
      this.total = this.subTotal - this.disc +this.pajak;
    })

    
  }
  gotoDaftarBarang(){
    this.navCtrl.push(DaftarBarangPage,{tipe:'nota'});
  }
  presentActionSheet(item){
    let profileModal = this.modalCtrl.create(MBarangPage,{from: 'nota',item:item}, {cssClass:'modal-edit'});
    profileModal.onDidDismiss(data => {
      //jika modal dclose di sini aksi hanya mengubah jumlah total / menghapus dari list
      //console.log(data);
      let uid = this.auth.getUid();
      
        if(data.aksi=='hapus'){
          this.db.getCart(uid,data.KodeItem).delete();
        }
        if(data.aksi=='update'){
          let item = {
            Jumlah : data['jumlah'],
            Total : data['total'],
            Disc : data['disc'],
          }
          this.db.getCart(uid,data.KodeItem).update(item)
        }
        
    });
    profileModal.present();
  }
  PageCode(){
    // generate kode dan push all item ke transaksi
    let uid = this.auth.getUid();
    let time = this.db.timestamp();
    this.profil.subscribe(user=>{
      let property={
        timestamp:time,
        uid_terima:uid,
        subtotal:this.subTotal,
        total:this.total,
        disc:this.disc,
        pajak:this.pajak,
        bayar:false,
        alamat:user['alamat'],
        email:user['email'],
        fullname:user['fullname'],
        kota:user['kota'],
        usaha:user['usaha'],
        telepon:user['telepon'],
        poin:0,
        jumlahItem:this.pcs,
        jenis:'trx'
      }
      this.db.moveCart(uid,property).then(success=>{
        this.navCtrl.push(BarcodePage,{kode:success.id,ket:'nota'});
      }).catch(e=>alert(e.error))

    })
  }

  hapusNota(){
    //hapus semua item dalam Carts
    this.db.clearCart(this.auth.getUid());
    this.navCtrl.pop();
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListBankAdminPage } from '../list-bank-admin/list-bank-admin';
import { DepositInfoPage } from '../deposit-info/deposit-info';
import { DaftarPoinPage } from '../daftar-poin/daftar-poin';
import { TransaksiSelesaiPage } from '../transaksi-selesai/transaksi-selesai';
import { InfoPenarikanPage } from '../info-penarikan/info-penarikan';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import "rxjs/add/operator/map";

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {
  saldo:Observable<any>;
  trxDone:Observable<any[]>;
  trxReq:Observable<any[]>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth:AuthProvider,
    private db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.saldo = this.db.getSaldo(this.auth.getUid()).valueChanges();
    this.trxReq = this.db.query().collection('transactions', ref => ref.where('uid','==',this.auth.getUid()).where('diproses','==',false))
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const inv = new Date(a.payload.doc.data()['timestamp']).getTime()
        return { id,inv, ...data };
      });
    });
    this.trxDone = this.db.query().collection('transactions', ref => ref.where('uid','==',this.auth.getUid()).where('diproses','==',true))
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const inv = new Date(a.payload.doc.data()['timestamp']).getTime()
        return { id,inv, ...data };
      });
    });
  }
  PageTopup(){
    this.navCtrl.push(ListBankAdminPage,{tipe:'isi'});
  }
  PageTarik(){
    this.navCtrl.push(ListBankAdminPage,{tipe:'tarik'});
  }

  depositDetail(id,tipe){
    
    if(tipe=='tarik'){
      this.navCtrl.push(InfoPenarikanPage,{id:id});
    }else{
      this.navCtrl.push(DepositInfoPage,{id:id});
    }
  }
  PagePoin(){
    this.navCtrl.push(DaftarPoinPage);
  
  }
  gotoTransaksiSelesai(id){
    this.navCtrl.push(TransaksiSelesaiPage,{id:id});
  }
  // gotoTransaksiTambah(id){
  //   this.navCtrl.push(TransaksiSelesaiPenambahanPage,{id:id});
  // }

}

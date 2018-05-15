import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { TambahBankPage } from '../tambah-bank/tambah-bank';
import { DepositInitialPage } from '../deposit-initial/deposit-initial';
import { PenarikanPage } from '../penarikan/penarikan';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-list-bank-admin',
  templateUrl: 'list-bank-admin.html',
})
export class ListBankAdminPage {

  banks:Observable<any[]>;
  tipe:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth:AuthProvider,
    private db : DatabaseProvider,
    private mdlCtrl:ModalController,
    private toasCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ListBankAdminPage');
    this.tipe = this.navParams.data.tipe;
    let uid = this.auth.getUid();
    this.banks = this.db.getBanks(uid).valueChanges();
  }

  tambahBank(){
    let modal = this.mdlCtrl.create(TambahBankPage,{},{enableBackdropDismiss:false});
    modal.onDidDismiss(data=>{
      if(data){
        let uid = this.auth.getUid();
        let kode = data.kode_bank+'-'+data.nomor_rekening;
        data.key = kode;
        let time = this.db.timestamp();
        data.time = time;
        this.db.cekKode(uid).collection('banks').doc(kode).get()
        .then(res=>{
          if(res.exists==true){
            this.showToast('Nomor Rekening sudah terdaftar');
          }else{
            this.db.getBank(uid,kode).set(data)
          }
        })

      }

    })
    modal.present()
    //this.navCtrl.push(TambahBankPage);
  }

  pilihBank(bank){
    //console.log(bank.kode_bank+' '+bank.nama_bank+' '+bank.nomor_rekening);
    if(this.tipe=='isi') this.navCtrl.push(DepositInitialPage,{bank:bank});
    if(this.tipe=='tarik') this.navCtrl.push(PenarikanPage,{bank:bank});

  }

  pilihTarikSaldo(){
    this.navCtrl.push(PenarikanPage);
  }

  showToast(msg){
    let toast = this.toasCtrl.create({
      message:msg,duration:3500});
    toast.present();
  }
}

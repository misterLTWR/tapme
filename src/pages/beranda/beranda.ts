import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { TerimalangsungPage } from '../terimalangsung/terimalangsung';
import { NotaPage } from '../nota/nota';
import { DaftarTransaksiPage } from '../daftar-transaksi/daftar-transaksi';
import { BayarscanPage } from '../bayarscan/bayarscan';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { DetailTransaksiPage } from '../detail-transaksi/detail-transaksi';
import { PinPage } from '../pin/pin';
import { BarcodePage } from '../barcode/barcode';
import { HasilScanLangsungPage } from '../hasil-scan-langsung/hasil-scan-langsung';
import { DaftarPoinPage } from '../daftar-poin/daftar-poin';

import { Observable } from "rxjs/Observable";
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import "rxjs/add/operator/map";
import { MenuTabsPage } from '../menu-tabs/menu-tabs';

@IonicPage()
@Component({
  selector: 'page-beranda',
  templateUrl: 'beranda.html',
})
export class BerandaPage {
  option: BarcodeScannerOptions;
  histories:Observable<any[]>;
  profil:Observable<any>;
  saldo:Observable<any>;
  user:any;
  UID:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private modalCtrl: ModalController,
    private db : DatabaseProvider,
    private auth:AuthProvider,
    private storage : Storage
    ) {
  }

  ionViewDidLoad() {
    this.profil = this.auth.profil
    this.user = this.storage.get('user');
    this.auth.user.subscribe(user=>{
      this.UID= user.uid;
      this.saldo = this.db.getSaldo(user.uid).valueChanges();
      this.histories = this.db.getHist(user.uid).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const inv = new Date(a.payload.doc.data()['timestamp']).getTime()
          return { id,inv, ...data };
        });
      });
    })
  }

  PageBayarscan(){
    //  this.navCtrl.push(HasilScanLangsungPage);

    this.option = {
      // preferFrontCamera:true,
      prompt: 'Scan QR Code hanya melalui TapMe',
      disableSuccessBeep:true,

    }
    this.barcodeScanner.scan(this.option).then((barcodeData) => {
      if(barcodeData){
        if(barcodeData.cancelled==true){
          this.navCtrl.setRoot(MenuTabsPage);
        }else{
          this.navCtrl.push(HasilScanLangsungPage,{data:barcodeData}).catch(e=>alert('gagal push page '+e));
        }
      }

    }, (err) => {
        alert(err);
        console.log(err);
    }).catch(cancel=>{
      console.log('rejected');
    });

      
     
  }



  AlertTerima(){
    let confirm = this.alertCtrl.create({
      title: 'Cara terima pembayaran',
      cssClass:'button-alert',
      buttons: [
        {
          text: 'BUAT NOTA TAGIHAN',    
          handler: () => {
            // console.log('Langsung clicked');
            this.navCtrl.push(NotaPage);
           
          }
        },
        {
          text: 'LANGSUNG TERIMA',
          handler: () => {
            this.navCtrl.push(TerimalangsungPage);
             
          }
        }
      ]
    });
    confirm.present();
  }

  gotoSemuaTransaksi(){
    this.navCtrl.push(DaftarTransaksiPage);
  }
  gotoDetailTransaksi(){
    this.navCtrl.push(DetailTransaksiPage);
  }
  PagePoin(){
    this.navCtrl.push(DaftarPoinPage);
  }
  openPIN(){
    let modal = this.modalCtrl.create(HasilScanLangsungPage,{data:''}, {cssClass:'modal-edit'});
    modal.onDidDismiss(data => {

    })
    modal.present()
  }

  

}
